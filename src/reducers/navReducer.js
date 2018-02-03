import * as types from '../actions/actionTypes'

const defaultState = {
  selectedTableId: '',
  selectedRowId: ''
}

export default function navReducer (state = defaultState, action) {
  switch (action.type) {
    case types.SELECT_TABLE:
      return Object.assign({}, state, {selectedTableId: action.tableId})

    case types.SELECT_ROW:
      return Object.assign(
        {},
        state,
        {selectedTableId: action.tableId, selectedRowId: action.rowId})

    case types.CLEAR_TABLES:
      return defaultState

    default:
      return state
  }
}
