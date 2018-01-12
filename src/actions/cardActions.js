import * as types from './actionTypes'

function generateNewCard () {
  const newCardId = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)
  return {
    id: newCardId,
    title: 'new table',
    selected: false,
    position: {
      x: 50,
      y: 50 },
    rows: [{
      id: 1,
      title: 'id',
      selected: false,
      color: 'gray' }]
  }
}

export function createCard () {
  return {type: types.CREATE_CARD, card: generateNewCard()}
}

export function selectCard (card) {
  return {type: types.SELECT_CARD, card}
}

export function selectRow (card, row) {
  return {type: types.SELECT_ROW, row, card}
}

export function addRow (cardId) {
  return {type: types.ADD_ROW, cardId}
}

export function removeRow (cardId, rowId) {
  return {type: types.REMOVE_ROW, cardId: cardId, rowId: rowId}
}

export function updatePosition (card, data) {
  return {type: types.UPDATE_POSITION, card, position: {x: data.lastX, y: data.lastY}}
}
