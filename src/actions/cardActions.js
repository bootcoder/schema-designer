import * as types from './actionTypes'

export function createCard (card) {
  return {type: types.CREATE_CARD, card}
}

export function selectCard (card) {
  return {type: types.SELECT_CARD, card}
}
