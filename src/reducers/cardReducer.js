import * as types from '../actions/actionTypes'

export default function cardReducer (state = [], action) {
  switch (action.type) {
    case types.CREATE_CARD:
      return [...state, {
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
      }]
    case types.SELECT_CARD:
      return [...state]
    default:
      return state
  }
}
