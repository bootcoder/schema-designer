import * as types from './actionTypes'

// //////////////////////
// ///// HELPERS ////////
// //////////////////////

function cloneObject (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function setRowPosition (tables, row) {
  // Find table from rowID
  let { cleanTable: table } = findRowWithID(tables, row.id)

  // Clone input row - DO NOT get row from state
  let cleanRow = cloneObject(row)

  // Find table element / set initial position
  const tableElement = document.getElementById(table.id)
  const tablePosition = tableElement.getBoundingClientRect()

  // Find row element / set initial position
  const rowElement = document.getElementById(row.id)
  const rowPosition = rowElement.getBoundingClientRect()

  // Calculate diff between table state and table DOM position
  const diff = {
    x: Math.abs(table.position.x - tablePosition.x),
    y: Math.abs(table.position.y - tablePosition.y)
  }

  // Subtract initial position from diff
  const updatedPosition = Object.assign({}, {
    x: rowPosition.x - diff.x,
    y: rowPosition.y - diff.y,
    width: Math.floor(rowPosition.width),
    height: Math.floor(rowPosition.height)
  })

  // Update row with new position data - need x, y, height, width
  cleanRow.position = updatedPosition

  // Return the cleanRow
  return cleanRow
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

function tableIDFromRowID (rowID) {
  const regEx = /.+?(?=-\d+)/
  return regEx.exec(rowID)[0]
}

function findTableWithID (tables, tableID) {
  return cloneObject(tables.filter(table => table.id === tableID)[0])
}

function findRowWithID (tables, rowID) {
  const tableID = tableIDFromRowID(rowID)
  const table = tables.filter(table => table.id === tableID)[0]
  const row = table.rows.filter(row => row.id === rowID)[0]
  const cleanTable = cloneObject(table)
  const cleanRow = cloneObject(row)
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
    const { tables } = getState()

    // Find destRow State
    let {cleanRow: destRow} = findRowWithID(tables, destRowID)
    let destRowWithPosition = setRowPosition(tables, destRow)

    // Find orgRow State
    let {cleanRow: orgRow} = findRowWithID(tables, orgRowID)
    let orgRowWithPosition = setRowPosition(tables, orgRow)

    // Set destRow inbound connection key org ID to org position
    destRowWithPosition.connections.inbound[orgRowID] = orgRowWithPosition.position

    // Set org row outbound connection key dest ID to dest position
    orgRowWithPosition.connections.outbound[destRowID] = destRowWithPosition.position

    // Dispatch updateRow for both
    dispatch(updateRow(orgRowWithPosition))
    dispatch(updateRow(destRowWithPosition))

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
    dispatch(checkSetRowSelection(table.id))
    return table
  }
}

export function checkSetRowSelection (tableID) {
  return (dispatch, getState) => {
    // Get state
    const { nav, tables } = getState()

    // IF no selectedRow in nav state selectRow from table.
    if (nav.selectedRowID === '') { return dispatch(selectRow(tableID)) }

    // Strip nav row ID to get table ID
    const navTableID = tableIDFromRowID(nav.selectedRowID)

    // IF nav table ID does not equal the tableID input
    if (navTableID !== tableID) {
      const table = findTableWithID(tables, tableID)
      // Dispatch select row for tables first row.
      return dispatch(selectRow(tableID, table.rows[0]))
    }
    // CATCH: Reselect row from nav state.
    return dispatch(selectRow(tableID, nav.selectedRowID))
  }
}

export function clearTables () {
  return {type: types.CLEAR_TABLES}
}

export function deselectOtherRows (tableID) {
  return (dispatch, getState) => {
    // Get the state for tables
    let { nav, tables } = getState()

    // Clone tables
    let newTables = [...tables]

    // Iterate over clone
    newTables.map(table => {
      // We don't need this table, return it
      if (table.id === tableID) { return table }

      // Iterate over all other tables
      table.rows.map(row => {
        // IF the row is selected or editable clone and modify
        if (row.selected || row.edit) {
          // NOTE: seems like I should be handling edit: false here as well... Need to check out
          const newRow = Object.assign({}, row, {selected: false})

          // IF nav row ID equals row.id
          if (nav.selectedRowID === row.id) {
            // Clear the row from the nav
            dispatch({type: types.DESELECT_NAV_ROW})
          }

          // Update the row
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
  console.log(`top rowID: ${rowID}`)
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
      console.log(rows)
      rowID = rows.length > 0 && rows[rows.length - 1].id
      console.log(rowID)
    }

    return dispatch({type: types.SELECT_ROW, rowID, tableID})
  }
}

export function selectTable (tableID) {
  return dispatch => {
    dispatch(deselectOtherRows(tableID))
    dispatch(checkSetRowSelection(tableID))
    return dispatch({type: types.SELECT_TABLE, tableID})
  }
}

export function toggleEditRow (tableID, rowID) {
  return { type: types.TOGGLE_EDIT_ROW, tableID, rowID }
}

export function updateInboundConnectionOrigin (remoteRowID, currentRowID, data) {
  return (dispatch, getState) => {
    const { tables } = getState()

    // Find table of connection
    const { cleanRow: remoteRow } = findRowWithID(tables, remoteRowID)
    const { cleanRow: currentRow } = findRowWithID(tables, currentRowID)
    const currentRowPosition = setRowPosition(tables, currentRow).position
    remoteRow.connections.outbound[currentRowID] = currentRowPosition

    return dispatch(updateRow(remoteRow))
  }
}

export function updatePosition (tableID, data) {
  return {type: types.UPDATE_POSITION, tableID, position: {x: data.lastX, y: data.lastY}}
}

export function updateRow (row) {
  return (dispatch, getState) => {
    const { tables } = getState()
    const updatedRowPosition = setRowPosition(tables, row)
    return dispatch({type: types.UPDATE_ROW, tableID: row.tableID, rowID: row.id, row: updatedRowPosition})
  }
}

export function updateTable (table) {
  return {type: types.UPDATE_TABLE, table}
}

export function updateTableName (tableID, name) {
  return {type: types.UPDATE_TABLE_NAME, tableID, name}
}
