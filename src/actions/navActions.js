import * as types from './actionTypes'

export function deselectNavRow () {
  return {type: types.DESELECT_NAV_ROW}
}

export function setForeignKeyOfOriginRow (rowId) {
  return {type: types.SET_FOREIGN_KEY_OF_ORIGIN_ROW, rowId}
}
