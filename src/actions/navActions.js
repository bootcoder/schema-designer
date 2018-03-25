import * as types from './actionTypes'

export function deselectNavRow () {
  return {type: types.DESELECT_NAV_ROW}
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
