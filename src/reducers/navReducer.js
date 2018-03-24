import * as types from '../actions/actionTypes'
import * as dataTypes from './dataTypes'

const defaultState = {
  dataType: dataTypes.pg,
  fkOrigin: null,
  selectedTableID: '',
  selectedRowID: '',
  windowWidth: 10000,
  windowHeight: 10000
}

export default function navReducer (state = defaultState, action) {
  switch (action.type) {
    case types.DESELECT_NAV_ROW:
      return Object.assign({}, state, {selectedRowID: ''})

    case types.REMOVE_FK_OF_ORIGIN_ROW:
      return Object.assign({}, state, {fkOrigin: null})

    case types.SET_DATA_TYPE:
    // NOTE: not sure about this line will come back to when I build options flow
      return Object.assign({}, state, {dataType: dataTypes[action.dataType]})

    case types.SET_FOREIGN_KEY_OF_ORIGIN_ROW:
      return Object.assign({}, state, {fkOrigin: action.rowID})

    case types.SELECT_TABLE:
      return Object.assign({}, state, {selectedTableID: action.tableID})

    case types.SELECT_ROW:
      return Object.assign(
        {},
        state,
        {selectedTableID: action.tableID, selectedRowID: action.rowID})

    case types.CLEAR_TABLES:
      return defaultState

    default:
      return state
  }
}
