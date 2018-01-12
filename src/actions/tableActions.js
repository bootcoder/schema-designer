import * as types from './actionTypes'

function generateNewTable () {
  const newTableId = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)
  return {
    id: newTableId,
    title: 'new table',
    selected: false,
    position: {
      x: Math.floor(Math.random() * (800 - 50) + 50),
      y: Math.floor(Math.random() * (500 - 50) + 50) },
    rows: [{
      id: 0,
      title: 'id',
      selected: false,
      color: 'gray' }]
  }
}

export function addRow (tableId) {
  return {type: types.ADD_ROW, tableId}
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
  return {type: types.REMOVE_ROW, tableId: tableId, rowId: rowId}
}

export function removeTable (tableId) {
  return {type: types.REMOVE_TABLE, tableId}
}

export function selectRow (table, row) {
  return {type: types.SELECT_ROW, row, table}
}

export function selectTable (table) {
  return {type: types.SELECT_TABLE, table}
}

export function updatePosition (table, data) {
  return {type: types.UPDATE_POSITION, table, position: {x: data.lastX, y: data.lastY}}
}
