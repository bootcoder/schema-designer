import * as types from './actionTypes'

export function deselectNavRow () {
  return {type: types.DESELECT_NAV_ROW}
}

export function setForeignKeyOfOriginRow (rowID) {
  return {type: types.SET_FOREIGN_KEY_OF_ORIGIN_ROW, rowID}
}
