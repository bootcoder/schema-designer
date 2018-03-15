import * as types from './actionTypes'

// //////////////////////
// ///// HELPERS ////////
// //////////////////////

function setRowPosition (rowId) {
  return (dispatch, getState) => {
    // Get find tableId, table and row from rowId
    const { tables } = getState()
    const tableId = findTableIdFromRowId(rowId)
    const table = tables.filter(table => table.id === tableId)[0]
    let row = table.rows.filter(row => row.id === rowId)[0]

    // Deep clone row
    let updatedRow = JSON.parse(JSON.stringify(row))

    // Find table element / set initial position
    const tableElement = document.getElementById(tableId)
    const tablePosition = tableElement.getBoundingClientRect()

    // Find row element / set initial position
    const rowElement = document.getElementById(rowId)
    const rowPosition = rowElement.getBoundingClientRect()

    // Calculate diff between table state and table DOM position
    const diff = {x: table.position.x - tablePosition.x, y: table.position.y - tablePosition.y}

    // Subtract initial position from diff
    const updatedPosition = Object.assign({}, rowPosition, {x: rowPosition.x - diff.x, y: rowPosition.y - diff.y})

    // Update row with new position data - need x, y, height, width
    updatedRow.position = updatedPosition

    // Dispatch updateRow action
    return dispatch(updateRow(updatedRow))
  }
}

// This is where default table lives.
function generateNewTable () {
  const newTableId = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)

  const newTable = {
    edit: false,
    connectionCount: 0,
    id: newTableId,
    // NOTE: Remove name placeholder and reset to 'new table' for production
    name: newTableId,
    position: {
      x: Math.floor(Math.random() * (800 - 50) + 50),
      y: Math.floor(Math.random() * (500 - 50) + 50) },
    selected: false
  }

  newTable.rows = [generateRow(newTable)]
  return newTable
}

// This is where default row lives.
function generateRow (table) {
  return {
    color: 'gray',
    connections: {
      inbound: {},
      outbound: {}
    },
    edit: false,
    id: generateRowId(table),
    selected: false,
    tableId: table.id,
    title: 'new_field'
  }
}

function generateRowId (table) {
  // Strip away table ID from row ID
  // Find next highest int within rows
  // Assign new row ID concating table ID
  if (!table.rows) {
    return `${table.id}-${0}`
  }
  const findTrailingDigits = /-(\d+)/
  const lastId = table.rows.length > 0 && table.rows.reduce((max, b) => {
    const id = parseInt(findTrailingDigits.exec(b.id)[1], 10)
    return Math.max(max, id)
  }, parseInt(findTrailingDigits.exec(table.rows[0].id)[1], 10))
  return `${table.id}-${lastId + 1}`
}

function findTableIdFromRowId (rowId) {
  const regEx = /.+?(?=-\d+)/
  return regEx.exec(rowId)[0]
}

function findTableWithId (tables, tableId) {
  return JSON.parse(JSON.stringify(tables.filter(table => table.id === tableId)[0]))
}

function findRowWithId (tables, rowId) {
  const tableId = findTableIdFromRowId(rowId)
  const table = tables.filter(table => table.id === tableId)[0]
  const row = table.rows.filter(row => row.id === rowId)[0]
  const cleanTable = JSON.parse(JSON.stringify(table))
  const cleanRow = JSON.parse(JSON.stringify(row))
  return { cleanRow, cleanTable }
}

// //////////////////////
// ///// ACTIONS ////////
// //////////////////////

export function addFkConnection (destRowId, orgRowId) {
  // org means ORIGIN
  // dest means DESTINATION
  return (dispatch, getState) => {
    dispatch(setRowPosition(destRowId))
    dispatch(setRowPosition(orgRowId))

    const { nav, tables } = getState()
    //
    // Find destinationRowState
    const {cleanRow: destRow, cleanTable: destTable} = findRowWithId(tables, destRowId)

    // Find orgRowState
    const {cleanRow: orgRow, cleanTable: orgTable} = findRowWithId(tables, orgRowId)

    // Set dest row inbound connection key org Id to org position
    destRow.connections.inbound[orgRowId] = orgRow.position

    // Set org row outbound connection key dest Id to dest position
    orgRow.connections.outbound[destRowId] = destRow.position

    // Calc connection count for both rows
    // const destConnectionCount = Object.keys(destRow.connections.inbound).length + Object.keys(destRow.connections.outbound).length
    // const orgConnectionCount = Object.keys(orgRow.connections.inbound).length + Object.keys(orgRow.connections.outbound).length

    // Set both tables connectionCount to connections total length
    // destTable.connectionCount = destConnectionCount
    // orgTable.connectionCount = orgConnectionCount

    // Dispatch updateRow for both
    dispatch(updateRow(orgRow))
    dispatch(updateRow(destRow))
    // new Promise((resolve, reject) => {
    //   dispatch(updateTable(orgTable))
    //   dispatch(updateTable(destTable))
    //   resolve()
    // }).then(() => {
    // })

    // Return dispatch to remove fk flag from nav state
    return dispatch({type: types.REMOVE_FK_OF_ORIGIN_ROW})
  }
}

export function addNewRow (tableId) {
  return (dispatch, getState) => {
    new Promise((resolve, reject) => {
      let { tables } = getState()
      let table = tables.filter(table => table.id === tableId)[0]
      let newRow = generateRow(table)
      dispatch(addRow(tableId, newRow))
      resolve(newRow)
    }).then((row) => {
      return dispatch(selectRow(tableId, row.id))
    })
  }
}

export function addRow (tableId, row) {
  return {type: types.ADD_ROW, tableId, row}
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

export function deselectOtherRows (tableId) {
  return (dispatch, getState) => {
    let { tables } = getState()
    let newTables = [...tables]
    newTables.map(table => {
      if (table.id === tableId) { return table }
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
      if (table.id !== nav.selectedTableId) { return table }
      let newTable = Object.assign({}, table, {edit: false})
      dispatch(updateTable(newTable))
      newTable.rows.map(row => {
        if (row.id !== nav.selectedRowId) { return row }
        let newRow = Object.assign({}, row, {edit: false})
        dispatch(updateRow(newRow))
        return newRow
      })
      return newTable
    })
    return tables
  }
}

export function moveDown (tableId, rowId) {
  return {type: types.MOVE_DOWN, tableId, rowId}
}

export function moveUp (tableId, rowId) {
  return {type: types.MOVE_UP, tableId, rowId}
}

export function removeRow (tableId, rowId) {
  return (dispatch, getState) => {
    let { tables } = getState()
    let rows = tables.filter(table => table.id === tableId)[0].rows
    let row = rows.filter(row => row.id === rowId)[0]
    let newRowId = null
    if (rows.length === 1) {
      // no action here, but the conditional is needed to catch
    } else if (rows[rows.indexOf(row) + 1] !== undefined) {
      newRowId = rows[rows.indexOf(row) + 1].id
    } else if (rows[rows.indexOf(row) - 1] !== undefined) {
      newRowId = rows[rows.indexOf(row) - 1].id
    }
    dispatch({type: types.REMOVE_ROW, tableId, rowId})
    return dispatch(selectRow(tableId, newRowId))
  }
}

export function removeTable (tableId) {
  return (dispatch, getState) => {
    let { tables } = getState()
    let newTable = tables.filter(table => table.id !== tableId)[0]
    newTable && dispatch(selectTable(newTable.id))
    return dispatch({type: types.REMOVE_TABLE, tableId})
  }
}

export function selectRow (tableId, rowId = null) {
  return (dispatch, getState) => {
    let { tables, nav } = getState()

    if (nav.fkOrigin !== null && nav.fkOrigin !== rowId) {
      new Promise((resolve, reject) => {
        dispatch(addFkConnection(rowId, nav.fkOrigin))
        resolve(tableId)
      }).then(tableId => {
        return dispatch(selectRow(tableId, rowId))
      })
    }

    if (rowId !== null && (tableId !== nav.selectedTableId || rowId !== nav.selectedRowId)) {
      dispatch(disableEditAndSave())
    }

    if (rowId === null) {
      let rows = tables.filter(table => table.id === tableId)[0].rows
      rowId = rows.length > 0 && rows[rows.length - 1].id
    }

    dispatch(selectTable(tableId))
    return dispatch({type: types.SELECT_ROW, rowId, tableId})
  }
}

export function selectTable (tableId) {
  return dispatch => {
    dispatch(deselectOtherRows(tableId))
    return dispatch({type: types.SELECT_TABLE, tableId})
  }
}

export function toggleEditRow (tableId, rowId) {
  return { type: types.TOGGLE_EDIT_ROW, tableId, rowId }
}

export function updateOutboundConnection (connectionRowId, rowId, data) {
  return (dispatch, getState) => {
    const { tables } = getState()
    const tableId = findTableIdFromRowId(connectionRowId)
    const table = tables.filter(table => table.id === tableId)[0]
    let cleanTable = JSON.parse(JSON.stringify(table))
    cleanTable.rows.map(row => {
      if (row.id === connectionRowId) {
        // NOTE: BAD CODE FOR DEMO, must make and hit dynamic row position helper method
        row.connections.outbound[rowId] = {x: data.lastX, y: data.lastY}
        return row
      }
      return row
    })
    console.log(cleanTable)
    return dispatch(updateTable(cleanTable))
  }
}

export function updatePosition (tableId, data) {
  return {type: types.UPDATE_POSITION, tableId, position: {x: data.lastX, y: data.lastY}}
}

export function updateRow (row) {
  return {type: types.UPDATE_ROW, tableId: row.tableId, rowId: row.id, row}
}

export function updateTable (table) {
  console.log('updating table')
  return {type: types.UPDATE_TABLE, table}
}

export function updateTableName (tableId, name) {
  return {type: types.UPDATE_TABLE_NAME, tableId, name}
}
