import * as types from './actionTypes'

export function createCard (card) {
  return {type: types.CREATE_CARD, card}
}

export function selectCard (card) {
  return {type: types.SELECT_CARD, card}
}

export function selectRow (row, card) {
  return {type: types.SELECT_ROW, row, card}
}

export function addRow (cardId) {
  return {type: types.ADD_ROW, cardId}
}
