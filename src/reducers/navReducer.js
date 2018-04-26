import * as types from '../actions/actionTypes'
import * as dataTypes from './dataTypes'

const defaultState = {
  addFKOrigin: null,
  customSize: false,
  dataType: dataTypes.pg,
  displayLoadScreen: false,
  rmFKOrigin: null,
  selectedTableID: '',
  selectedRowID: '',
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight
}

export default function navReducer (state = defaultState, action) {
  switch (action.type) {
    case types.CLEAR_TABLES:
      return Object.assign({}, state, {addFKOrigin: null, rmFKOrigin: null, selectedTableID: '', selectedRowID: ''})

    case types.DESELECT_NAV_ROW:
      return Object.assign({}, state, {selectedRowID: ''})

    case types.LOAD_SCHEMA:
      return Object.assign({}, state, {displayLoadScreen: false})

    case types.REMOVE_FK_OF_ORIGIN_ROW:
      return Object.assign({}, state, {addFKOrigin: null, rmFKOrigin: null})

    case types.RESIZE_SANDBOX:
      return Object.assign({}, state, {windowWidth: action.width, windowHeight: action.height})

    case types.SET_DATA_TYPE:
      return Object.assign({}, state, {dataType: dataTypes[action.dataType]})

    case types.SET_DEFAULT_SANDBOX_VIEW:
      return Object.assign({}, state, {displayLoadScreen: false, addFKOrigin: null, rmFKOrigin: null})

    case types.SET_ID_ADD_FK:
      return Object.assign({}, state, {addFKOrigin: action.rowID})

    case types.SET_ID_REMOVE_FK:
      return Object.assign({}, state, {rmFKOrigin: action.rowID})

    case types.SELECT_TABLE:
      return Object.assign({}, state, {selectedTableID: action.tableID})

    case types.SELECT_ROW:
      return Object.assign(
        {},
        state,
        {selectedTableID: action.tableID, selectedRowID: action.rowID})

    case types.TOGGLE_LOAD_SCREEN:
      return Object.assign({}, state, {displayLoadScreen: !state.displayLoadScreen})

    default:
      return state
  }
}
