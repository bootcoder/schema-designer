import * as types from '../actions/actionTypes'

const emptyCard = {
  id: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10),
  title: 'new table',
  position: {
    x: 50,
    y: 50
  },
  rows: [
    {
      title: 'id',
      color: 'brown'
    }
  ]
}

export default function cardReducer (state = [], action) {
  switch (action.type) {
    case types.CREATE_CARD:
      return [...state, emptyCard]

    default:
      return state
  }
}
