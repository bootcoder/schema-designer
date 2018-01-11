import * as types from '../actions/actionTypes'

const newCardId = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)

const newCard = {
  id: newCardId,
  title: 'new table',
  position: {
    x: 50,
    y: 50 },
  rows: [{
    id: 1,
    title: 'id',
    color: 'brown' }]
}

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
      return [...state, newCard]

    case types.ADD_ROW:
      // const currentCard = state.find((card) => card.id === action.card.id)
      // console.log(currentCard)
      return state.map((card) => {
        if (card.id === action.cardId) {
          return Object.assign({}, card, {rows: [...card.rows, newRow(card)]})
        }
        return card
      })

    default:
      return state
  }
}
