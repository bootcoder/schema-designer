import * as types from '../actions/actionTypes'

const defaultState = {
  fkOrigin: null,
  selectedTableId: '',
  selectedRowId: '',
  windowWidth: 10000,
  windowHeight: 10000
}

export default function navReducer (state = defaultState, action) {
  switch (action.type) {
    case types.DESELECT_NAV_ROW:
      return Object.assign({}, state, {selectedRowId: ''})

    case types.REMOVE_FK_OF_ORIGIN_ROW:
      return Object.assign({}, state, {fkOrigin: null})

    case types.SET_FOREIGN_KEY_OF_ORIGIN_ROW:
      return Object.assign({}, state, {fkOrigin: action.rowId})

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
