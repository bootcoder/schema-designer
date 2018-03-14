import * as types from './actionTypes'

// //////////////////////
// ///// HELPERS ////////
// //////////////////////

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

function getTableIdFromRowId (rowId) {
  const regEx = /.+?(?=-\d+)/
  return regEx.exec(rowId)[0]
}

// //////////////////////
// ///// ACTIONS ////////
// //////////////////////

export function addFkConnection (tableId, rowId, originId) {
  return (dispatch, getState) => {
    // remove fk from nav
    // update first table row with connection data
    // update second table row with connection data

    // how to get the position is interesting
    // cant pull direct from document because of sidebar offset.
    // maybe pull x from table position state and y from document....
    console.log('here')
    console.log(tableId)
    console.log(rowId)
    console.log(originId)
    const { nav, tables } = getState()
    //
    const tableState = tables.filter(table => table.id === tableId)[0]
    const rowState = tableState.rows.filter(row => row.id === rowId)[0]

    const tableElement = document.getElementById(tableId)
    const tableElementPos = tableElement.getBoundingClientRect()

    const rowElement = document.getElementsByClassName(rowId)[0]
    const rowPos = rowElement.getBoundingClientRect()

    const diff = {x: tableElementPos.x - tableState.position.x, y: tableElementPos.y - tableState.position.y}

    const adjRowPos = {x: rowPos.x - diff.x, y: rowPos.y - diff.y}

    const connections = JSON.parse(JSON.stringify(rowState.connections))
    // debugger
    connections.inbound[originId] = adjRowPos
    const newRow = Object.assign({}, rowState, { connections })
    //
    let cleanRows = [...tableState.rows]
    const newRows = cleanRows.map(row => {
      if (row.id === newRow.id) {
        return newRow
      } else {
        return row
      }
    })

    const newTable = Object.assign({}, tableState, {rows: newRows, connectionCount: tableState.connectionCount + 1})



    const destTableId = getTableIdFromRowId(originId)
    const destTableElement = document.getElementById(destTableId)
    const destRowElement = document.getElementsByClassName(originId)[0]
    const destRowPos = destRowElement.getBoundingClientRect()
    const destTableState = tables.filter(table => table.id === destTableId)[0]
    const destRowState = destTableState.rows.filter(row => row.id === originId)[0]
    const destAdjRowPos = {x: destRowPos.x - diff.x, y: destRowPos.y - diff.y}

    const newDestRow = Object.assign({}, destRowState)
    let destConnections = JSON.parse(JSON.stringify(newDestRow.connections))
    destConnections.outbound[rowId] = destAdjRowPos
    let cleanDestRows = [...destTableState.rows]
    const newDestRows = cleanDestRows.map(row => {
      if (row.id === originId) {
        return Object.assign({}, newDestRow, {connections: destConnections})
      } else {
        return row
      }
    })
    const destTable = Object.assign({}, destTableState, { rows: newDestRows, connectionCount: destTableState.connectionCount + 1 })

    // debugger
    dispatch(updateTable(destTable))
    dispatch(updateTable(newTable))

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
        dispatch(addFkConnection(tableId, rowId, nav.fkOrigin))
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

export function updatePosition (tableId, data) {
  return {type: types.UPDATE_POSITION, tableId, position: {x: data.lastX, y: data.lastY}}
}

export function updateRow (row) {
  return (dispatch, getState) => {
    return dispatch({
      type: types.UPDATE_ROW,
      tableId: row.tableId,
      rowId: row.id,
      row
    })
  }
}

export function updateTable (table) {
  console.log('updating table')
  return {type: types.UPDATE_TABLE, table}
}

export function updateTableName (tableId, name) {
  return {type: types.UPDATE_TABLE_NAME, tableId, name}
}
