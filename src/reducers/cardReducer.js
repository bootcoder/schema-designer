import * as types from '../actions/actionTypes'

const newCardId = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)

const newCard = {
  id: newCardId,
  title: 'new table',
  position: {
    x: 50,
    y: 50
  },
  rows: [
    {
      id: 1,
      title: 'id',
      color: 'brown'
    }
  ]
}

export default function cardReducer (state = [], action) {
  switch (action.type) {
    case types.CREATE_CARD:
      return [...state, newCard]

    default:
      return state
  }
}
