import * as types from './actionTypes'

export function deselectNavRow () {
  return {type: types.DESELECT_NAV_ROW}
}

export function resizeSandbox (width, height) {
  return (dispatch, getState) => {
    const { tables } = getState()

    // Check provided w/h do not exceed bounds of schema
    // Pass largest value to resize sandbox
    let biggestX = 0
    let biggestY = 0

    tables.forEach(table => {
      let tableX = table.position.x + table.position.width
      let tableY = table.position.y
      biggestX = tableX > biggestX ? tableX : biggestX
      biggestY = tableY > biggestY ? tableY : biggestY
    })

    width = width > biggestX ? width : biggestX
    height = height > biggestY ? height : biggestY

    return dispatch({type: types.RESIZE_SANDBOX, width: width + 150, height: height + 250})
  }
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
