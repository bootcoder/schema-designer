import * as types from './actionTypes'

export function createCard (card) {
  return {type: types.CREATE_CARD, card}
}
