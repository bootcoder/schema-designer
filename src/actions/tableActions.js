import * as types from './actionTypes'

function generateNewTable () {
  const newTableId = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)
  return {
    id: newTableId,
    title: 'new table',
    selected: false,
    edit: false,
    position: {
      x: Math.floor(Math.random() * (800 - 50) + 50),
      y: Math.floor(Math.random() * (500 - 50) + 50) },
    rows: [{
      id: 0,
      edit: false,
      title: 'id',
      selected: false,
      color: 'gray' }]
  }
}

function generateRow (table) {
  let newId = 0
  newId = table.rows.length > 0 && table.rows.reduce((max, b) => Math.max(max, b.id), table.rows[0].id)
  return {
    id: newId + 1,
    edit: false,
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
  return {type: types.CREATE_TABLE, table: generateNewTable()}
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
  return {type: types.REMOVE_TABLE, tableId}
}

export function selectRow (tableId, rowId = null) {
  return (dispatch, getState) => {
    if (rowId === null) {
      let { tables } = getState()
      let rows = tables.filter(table => table.id === tableId)[0].rows
      rowId = rows.length > 0 && rows[rows.length - 1].id
    }
    return dispatch({type: types.SELECT_ROW, rowId, tableId})
  }
}

export function selectTable (tableId) {
  return {type: types.SELECT_TABLE, tableId}
}

export function toggleEditRow (tableId, rowId) {
  return { type: types.TOGGLE_EDIT_ROW, tableId, rowId }
}

export function updatePosition (tableId, data) {
  return {type: types.UPDATE_POSITION, tableId, position: {x: data.lastX, y: data.lastY}}
}

export function updateRow (row) {
  return (dispatch, getState) => {
    let { nav } = getState()
    return dispatch({
      type: types.UPDATE_ROW,
      tableId: nav.selectedTableId,
      rowId: nav.selectedRowId,
      row
    })
  }
}

export function updateTableTile (tableId, title) {
  return {type: types.UPDATE_TABLE_TITLE, tableId, title}
}
