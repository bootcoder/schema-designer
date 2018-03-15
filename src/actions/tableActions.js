import * as types from './actionTypes'

// //////////////////////
// ///// HELPERS ////////
// //////////////////////

function setRowPosition (rowID) {
  return (dispatch, getState) => {
    const { tables } = getState()

    // Find tableID, table and row from rowID
    let {cleanRow: row, cleanTable: table} = findRowWithID(tables, rowID)

    // Find table element / set initial position
    const tableElement = document.getElementById(table.id)
    const tablePosition = tableElement.getBoundingClientRect()

    // Find row element / set initial position
    const rowElement = document.getElementById(rowID)
    const rowPosition = rowElement.getBoundingClientRect()

    // Calculate diff between table state and table DOM position
    const diff = {x: Math.abs(table.position.x - tablePosition.x), y: Math.abs(table.position.y - tablePosition.y)}

    // Subtract initial position from diff
    const updatedPosition = Object.assign({}, rowPosition, {x: rowPosition.x - diff.x, y: rowPosition.y - diff.y})

    // Update row with new position data - need x, y, height, width
    row.position = updatedPosition

    // Dispatch updateRow action
    return dispatch(updateRow(row))
  }
}

// DEFAULT table lives here.
function generateNewTable () {
  const newTableID = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)

  const newTable = {
    edit: false,
    connectionCount: 0,
    id: newTableID,
    // NOTE: Remove name placeholder and reset to 'new table' for production
    name: newTableID,
    position: {
      x: Math.floor(Math.random() * (800 - 50) + 50),
      y: Math.floor(Math.random() * (500 - 50) + 50) },
    selected: false
  }

  newTable.rows = [generateRow(newTable)]
  return newTable
}

// DEFAULT row lives here.
function generateRow (table) {
  return {
    color: 'gray',
    connections: {
      inbound: {},
      outbound: {}
    },
    edit: false,
    id: generateRowID(table),
    selected: false,
    tableID: table.id,
    title: 'new_field'
  }
}

function generateRowID (table) {
  // Strip away table ID from row ID
  // Find next highest int within rows
  // Assign new row ID concating table ID
  if (!table.rows) {
    return `${table.id}-${0}`
  }
  const findTrailingDigits = /-(\d+)/
  const lastID = table.rows.length > 0 && table.rows.reduce((max, b) => {
    const id = parseInt(findTrailingDigits.exec(b.id)[1], 10)
    return Math.max(max, id)
  }, parseInt(findTrailingDigits.exec(table.rows[0].id)[1], 10))
  return `${table.id}-${lastID + 1}`
}

function findTableIDFromRowID (rowID) {
  const regEx = /.+?(?=-\d+)/
  return regEx.exec(rowID)[0]
}

function findTableWithID (tables, tableID) {
  return JSON.parse(JSON.stringify(tables.filter(table => table.id === tableID)[0]))
}

function findRowWithID (tables, rowID) {
  const tableID = findTableIDFromRowID(rowID)
  const table = tables.filter(table => table.id === tableID)[0]
  const row = table.rows.filter(row => row.id === rowID)[0]
  const cleanTable = JSON.parse(JSON.stringify(table))
  const cleanRow = JSON.parse(JSON.stringify(row))
  return { cleanRow, cleanTable }
}

// //////////////////////
// ///// ACTIONS ////////
// //////////////////////

export function addForeignKeyConnection (destRowID, orgRowID) {
  //
  // org means ORIGIN
  // dest means DESTINATION
  //
  return (dispatch, getState) => {
    dispatch(setRowPosition(destRowID))
    dispatch(setRowPosition(orgRowID))

    const { tables } = getState()

    // Find destRow State
    const {cleanRow: destRow} = findRowWithID(tables, destRowID)

    // Find orgRow State
    const {cleanRow: orgRow} = findRowWithID(tables, orgRowID)

    // Set destRow inbound connection key org ID to org position
    destRow.connections.inbound[orgRowID] = orgRow.position

    // Set org row outbound connection key dest ID to dest position
    orgRow.connections.outbound[destRowID] = destRow.position

    // Dispatch updateRow for both
    dispatch(updateRow(orgRow))
    dispatch(updateRow(destRow))

    // Return dispatch to remove fk flag from nav state
    return dispatch({type: types.REMOVE_FK_OF_ORIGIN_ROW})
  }
}

export function addNewRow (tableID) {
  return (dispatch, getState) => {
    new Promise((resolve, reject) => {
      let { tables } = getState()
      let cleanTable = findTableWithID(tables, tableID)
      let newRow = generateRow(cleanTable)
      dispatch(addRow(tableID, newRow))
      resolve(newRow)
    }).then((row) => {
      return dispatch(selectRow(tableID, row.id))
    })
  }
}

export function addRow (tableID, row) {
  return {type: types.ADD_ROW, tableID, row}
}

export function createTable () {
  return dispatch => {
    let table = generateNewTable()
    dispatch({type: types.CREATE_TABLE, table})
    dispatch(disableEditAndSave())
    dispatch(deselectOtherRows(table.id))
    dispatch(selectRow(table.id))
    return table
  }
}

export function clearTables () {
  return {type: types.CLEAR_TABLES}
}

export function deselectOtherRows (tableID) {
  return (dispatch, getState) => {
    let { tables } = getState()
    let newTables = [...tables]
    newTables.map(table => {
      if (table.id === tableID) { return table }
      table.rows.map(row => {
        if (row.selected || row.edit) {
          const newRow = Object.assign({}, row, {selected: false})
          dispatch({type: types.DESELECT_NAV_ROW})
          dispatch(updateRow(newRow))
          return newRow
        }
        return row
      })
      return newTables
    })
  }
}

export function disableEditAndSave () {
  return (dispatch, getState) => {
    let { nav, tables } = getState()
    tables.map(table => {
      if (table.id !== nav.selectedTableID) { return table }
      let newTable = Object.assign({}, table, {edit: false})
      dispatch(updateTable(newTable))
      newTable.rows.map(row => {
        if (row.id !== nav.selectedRowID) { return row }
        let newRow = Object.assign({}, row, {edit: false})
        dispatch(updateRow(newRow))
        return newRow
      })
      return newTable
    })
    return tables
  }
}

export function moveDown (tableID, rowID) {
  return {type: types.MOVE_DOWN, tableID, rowID}
}

export function moveUp (tableID, rowID) {
  return {type: types.MOVE_UP, tableID, rowID}
}

export function removeRow (tableID, rowID) {
  return (dispatch, getState) => {
    let { tables } = getState()
    let {cleanRow: row, cleanTable: table} = findRowWithID(tables, rowID)
    let rows = table.rows
    let newRowID = null

    // Find the next index to select
    if (rows.length === 1) {
      // No action here, newRowID remains null, but the conditional is needed to catch
    } else if (rows[rows.indexOf(row) + 1] !== undefined) {
      newRowID = rows[rows.indexOf(row) + 1].id
    } else if (rows[rows.indexOf(row) - 1] !== undefined) {
      newRowID = rows[rows.indexOf(row) - 1].id
    }
    dispatch({type: types.REMOVE_ROW, tableID, rowID})
    return dispatch(selectRow(tableID, newRowID))
  }
}

export function removeTable (tableID) {
  return (dispatch, getState) => {
    let { tables } = getState()
    let newTable = tables.filter(table => table.id !== tableID)[0]
    // NOTE: not sure why I dispatched selectTable here. Investigate.
    newTable && dispatch(selectTable(newTable.id))
    return dispatch({type: types.REMOVE_TABLE, tableID})
  }
}

export function selectRow (tableID, rowID = null) {
  return (dispatch, getState) => {
    let { tables, nav } = getState()

    if (nav.fkOrigin !== null && nav.fkOrigin !== rowID) {
      new Promise((resolve, reject) => {
        dispatch(addForeignKeyConnection(rowID, nav.fkOrigin))
        resolve(tableID)
      }).then(tableID => {
        return dispatch(selectRow(tableID, rowID))
      })
    }

    if (rowID !== null && (tableID !== nav.selectedTableID || rowID !== nav.selectedRowID)) {
      dispatch(disableEditAndSave())
    }

    if (rowID === null) {
      let rows = tables.filter(table => table.id === tableID)[0].rows
      rowID = rows.length > 0 && rows[rows.length - 1].id
    }

    dispatch(selectTable(tableID))
    return dispatch({type: types.SELECT_ROW, rowID, tableID})
  }
}

export function selectTable (tableID) {
  return dispatch => {
    dispatch(deselectOtherRows(tableID))
    return dispatch({type: types.SELECT_TABLE, tableID})
  }
}

export function toggleEditRow (tableID, rowID) {
  return { type: types.TOGGLE_EDIT_ROW, tableID, rowID }
}

export function updateOutboundConnection (connectionRowID, rowID, data) {
  return (dispatch, getState) => {
    const { tables } = getState()
    const { cleanTable } = findRowWithID(tables, connectionRowID)

    cleanTable.rows.map(row => {
      if (row.id === connectionRowID) {
        // NOTE: BAD CODE FOR DEMO, must make and hit dynamic row position helper method
        row.connections.outbound[rowID] = {x: data.lastX, y: data.lastY}
        return row
      }
      return row
    })
    return dispatch(updateTable(cleanTable))
  }
}

export function updatePosition (tableID, data) {
  return {type: types.UPDATE_POSITION, tableID, position: {x: data.lastX, y: data.lastY}}
}

export function updateRow (row) {
  return {type: types.UPDATE_ROW, tableID: row.tableID, rowID: row.id, row}
}

export function updateTable (table) {
  console.log('updating table')
  return {type: types.UPDATE_TABLE, table}
}

export function updateTableName (tableID, name) {
  return {type: types.UPDATE_TABLE_NAME, tableID, name}
}
