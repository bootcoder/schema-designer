import * as types from '../actions/actionTypes'

export default function cardReducer (state = [], action) {
  switch (action.type) {
    case types.CREATE_CARD:
      return [...state, {
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
    default:
      return state
  }
}
