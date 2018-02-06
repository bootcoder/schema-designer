import * as types from './actionTypes'

function generateNewTable () {
  const newTableId = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)
  return {
    id: newTableId,
    // NOTE: Remove this and reset to 'new table' for production
    name: newTableId,
    selected: false,
    edit: false,
    position: {
      x: Math.floor(Math.random() * (800 - 50) + 50),
      y: Math.floor(Math.random() * (500 - 50) + 50) },
    rows: [{
      id: `${newTableId}-${0}`,
      edit: false,
      tableId: newTableId,
      title: 'id',
      selected: false,
      color: 'gray' }]
  }
}

function generateRow (table) {
  // Strip away the table ID from the row ID
  // Then find the next highest int
  // Assign to new row ID concating the table ID
  const findTrailingDigits = /-(\d+)/
  const lastId = table.rows.length > 0 && table.rows.reduce((max, b) => {
    const id = parseInt(findTrailingDigits.exec(b.id)[1], 10)
    return Math.max(max, id)
  }, parseInt(findTrailingDigits.exec(table.rows[0].id)[1], 10))
  return {
    id: `${table.id}-${lastId + 1}`,
    edit: false,
    tableId: table.id,
    title: 'new_field',
    selected: false,
    color: 'gray'
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
  return {type: types.UPDATE_TABLE, table}
}

export function updateTableName (tableId, name) {
  return {type: types.UPDATE_TABLE_NAME, tableId, name}
}
