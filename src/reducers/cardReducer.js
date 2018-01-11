import * as types from '../actions/actionTypes'

function newRow (card) {
  const newId = card.rows.reduce((max, b) => Math.max(max, b.id), card.rows[0].id)
  return {
    id: newId + 1,
    title: 'new_field',
    color: 'brown'
  }
}

export default function cardReducer (state = [], action) {
  switch (action.type) {
    case types.CREATE_CARD:
      return [...state, action.card]

    case types.ADD_ROW:
      return state.map((card) => {
        if (card.id !== action.cardId) { return card }
        return Object.assign({}, card, {rows: [...card.rows, newRow(card)]})
      })

    default:
      return state
  }
}
