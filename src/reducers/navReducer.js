import * as types from '../actions/actionTypes'

const defaultState = {
  selectedTableId: '',
  selectedRowId: ''
}

export default function navReducer (state = defaultState, action) {
  switch (action.type) {
    case types.SELECT_TABLE:
      return Object.assign({}, state, {selectedTableId: action.tableId, selectedRowId: ''})

    case types.SELECT_ROW:
      return Object.assign({}, state, {selectedRowId: action.rowId})

    default:
      return state
  }
}
