import * as types from '../actions/actionTypes'

const defaultState = {
  selectedCardId: '',
  selectedRowId: ''
}

export default function navReducer (state = defaultState, action) {
  switch (action.type) {
    case types.SELECT_ROW:
      return Object.assign({}, state, {selectedRowId: action.row.id, selectedCardId: action.card.id})

    case types.SELECT_CARD:
      return Object.assign({}, state, {selectedCardId: action.card.id})

    default:
      return state
  }
}
