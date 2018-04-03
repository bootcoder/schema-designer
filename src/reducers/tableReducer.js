import * as types from '../actions/actionTypes'
import * as defaults from './defaults'

export default function tableReducer (state = defaults.tables, action) {
  switch (action.type) {
    case types.ADD_ROW:
      return state.map((table) => {
        if (table.id !== action.tableID) { return table }
        return Object.assign({}, table, {rows: [...table.rows, action.row]})
      })

    case types.CLEAR_TABLES:
      return []

    case types.CREATE_TABLE:
      return [...state, action.table]

    case types.LOAD_SCHEMA:
      return action.tables

    case types.MOVE_DOWN:
      return state.map((table) => {
        if (table.id !== action.tableID) { return table }
        const rows = [...table.rows]
        const targetIndex = rows.findIndex((row) => row.id === action.rowID)
        if (targetIndex === rows.length - 1) { return table }
        const row = rows.splice(targetIndex, 1)[0]
        rows.splice(targetIndex + 1, 0, row)
        return Object.assign({}, table, {rows})
      })

    case types.MOVE_UP:
      return state.map((table) => {
        if (table.id !== action.tableID) { return table }
        const rows = [...table.rows]
        const targetIndex = rows.findIndex((row) => row.id === action.rowID)
        if (targetIndex === 0) { return table }
        const row = rows.splice(targetIndex, 1)[0]
        rows.splice(targetIndex - 1, 0, row)
        return Object.assign({}, table, {rows})
      })

    case types.REMOVE_TABLE:
      return state.filter((table) => table.id !== action.tableID)

    case types.REMOVE_ROW:
      return state.map((table) => {
        if (table.id !== action.tableID) { return table }
        const rows = table.rows.filter(e => e.id !== action.rowID)
        return Object.assign({}, table, {rows})
      })

    case types.SELECT_ROW:
      return state.map((table) => {
        const rows = table.rows.map((row) => {
          if (table.id === action.tableID && row.id === action.rowID) {
            return Object.assign({}, row, {selected: true})
          }
          return Object.assign({}, row, {selected: false})
        })
        if (table.id === action.tableID) {
          return Object.assign({}, table, {rows: rows, selected: true})
        } else {
          return Object.assign({}, table, {rows: rows, selected: false})
        }
      })

    case types.SELECT_TABLE:
      return state.map((table) => {
        if (table.id !== action.tableID) {
          return Object.assign({}, table, {selected: false})
        }
        return Object.assign({}, table, {selected: true})
      })

    case types.SET_DEFAULT_SANDBOX_VIEW:
      return state.map(table => {
        const rows = table.rows.map(row => {
          return Object.assign({}, row, {edit: false})
        })
        return Object.assign({}, table, {rows, edit: false})
      })

    case types.TOGGLE_EDIT_ROW:
      return state.map((table) => {
        const rows = table.rows.map((row) => {
          if (table.id === action.tableID && row.id === action.rowID && row.edit !== true) {
            return Object.assign({}, row, {edit: true})
          } else {
            return Object.assign({}, row, {edit: false})
          }
        })
        return Object.assign({}, table, {rows})
      })

    case types.TOGGLE_EDIT_TABLE:
      return state.map((table) => {
        if (table.id !== action.tableID) { return table }
        return Object.assign({}, table, {edit: !table.edit})
      })

    case types.UPDATE_POSITION:
      return state.map((table) => {
        if (table.id !== action.tableID) { return table }
        return Object.assign(
          {},
          table,
          { position: {
            ...table.position,
            x: action.position.x,
            y: action.position.y
          }}
        )
      })

    case types.UPDATE_ROW:
      return state.map((table) => {
        let connectionCount = 0
        const rows = table.rows.map((row) => {
          connectionCount += Object.keys(row.connections.inbound).length + Object.keys(row.connections.outbound).length
          if (table.id === action.tableID && row.id === action.rowID) {
            return Object.assign({}, action.row)
          } else {
            return row
          }
        })

        return Object.assign({}, table, {rows: rows, connectionCount})
      })

    case types.UPDATE_TABLE:
      return state.map(table => {
        if (table.id !== action.table.id) { return table }
        return Object.assign({}, action.table)
      })

    default:
      return state
  }
}
