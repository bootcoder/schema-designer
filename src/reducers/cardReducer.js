import * as types from '../actions/actionTypes'

function newRow (card) {
  const newId = card.rows.reduce((max, b) => Math.max(max, b.id), card.rows[0].id)
  return {
    id: newId + 1,
    title: 'new_field',
    selected: false,
    color: 'gray'
  }
}

export default function cardReducer (state = [], action) {
  switch (action.type) {
    case types.SELECT_CARD:
      return state.map((card) => {
        if (card.id !== action.card.id) {
          return Object.assign({}, card, {selected: false})
        }
        return Object.assign({}, card, {selected: true})
      })

    case types.SELECT_ROW:
      return state.map((card) => {
        const rows = card.rows.map((row) => {
          if (card.id === action.card.id && row.id === action.row.id) {
            return Object.assign({}, row, {selected: true})
          }
          return Object.assign({}, row, {selected: false})
        })
        return Object.assign({}, card, {rows: rows})
      })

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
