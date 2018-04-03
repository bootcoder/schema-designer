import * as types from './actionTypes'

export function deselectNavRow () {
  return {type: types.DESELECT_NAV_ROW}
}

export function resizeSandbox (width, height) {
  return {type: types.RESIZE_SANDBOX, width, height}
}

export function setDataType (dataType) {
  return {type: types.SET_DATA_TYPE, dataType}
}

export function setIDAddFK (rowID) {
  return {type: types.SET_ID_ADD_FK, rowID}
}

export function setIDRemoveFK (rowID) {
  return {type: types.SET_ID_REMOVE_FK, rowID}
}

export function toggleLoadScreen () {
  return {type: types.TOGGLE_LOAD_SCREEN}
}
