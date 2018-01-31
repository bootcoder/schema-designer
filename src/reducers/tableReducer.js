import * as types from '../actions/actionTypes'

function newRow (table) {
  const newId = table.rows.reduce((max, b) => Math.max(max, b.id), table.rows[0].id)
  return {
    id: newId + 1,
    title: 'new_field',
    selected: false,
    color: 'gray'
  }
}

export default function tableReducer (state = [], action) {
  switch (action.type) {
    case types.ADD_ROW:
      return state.map((table) => {
        if (table.id !== action.tableId) { return table }
        return Object.assign({}, table, {rows: [...table.rows, newRow(table)]})
      })

    case types.CREATE_TABLE:
      return [...state, action.table]

    case types.MOVE_DOWN:
      return state.map((table) => {
        if (table.id !== action.tableId) { return table }
        const rows = [...table.rows]
        const targetIndex = rows.findIndex((row) => row.id === action.rowId)
        if (targetIndex === rows.length - 1) { return table }
        const row = rows.splice(targetIndex, 1)[0]
        rows.splice(targetIndex + 1, 0, row)
        return Object.assign({}, table, {rows})
      })

    case types.MOVE_UP:
      return state.map((table) => {
        if (table.id !== action.tableId) { return table }
        const rows = [...table.rows]
        const targetIndex = rows.findIndex((row) => row.id === action.rowId)
        if (targetIndex === 0) { return table }
        const row = rows.splice(targetIndex, 1)[0]
        rows.splice(targetIndex - 1, 0, row)
        return Object.assign({}, table, {rows})
      })

    case types.REMOVE_TABLE:
      return state.filter((table) => table.id !== action.tableId)

    case types.REMOVE_ROW:
      return state.map((table) => {
        if (table.id !== action.tableId) { return table }
        const rows = table.rows.filter(e => e.id !== action.rowId)
        return Object.assign({}, table, {rows})
      })

    case types.SELECT_TABLE:
      return state.map((table) => {
        if (table.id !== action.tableId) {
          return Object.assign({}, table, {selected: false})
        }
        return Object.assign({}, table, {selected: true})
      })

    case types.SELECT_ROW:
      return state.map((table) => {
        const rows = table.rows.map((row) => {
          if (table.id === action.tableId && row.id === action.rowId) {
            return Object.assign({}, row, {selected: true})
          }
          return Object.assign({}, row, {selected: false})
        })
        return Object.assign({}, table, {rows: rows})
      })

    case types.UPDATE_POSITION:
      return state.map((table) => {
        if (table.id !== action.tableId) { return table }
        return Object.assign(
          {},
          table,
          {position: {x: action.position.x, y: action.position.y}})
      })

    default:
      return state
  }
}
