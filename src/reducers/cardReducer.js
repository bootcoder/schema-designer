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
    case types.ADD_ROW:
      return state.map((card) => {
        if (card.id !== action.cardId) { return card }
        return Object.assign({}, card, {rows: [...card.rows, newRow(card)]})
      })

    case types.CREATE_CARD:
      return [...state, action.card]

    case types.REMOVE_CARD:
      return state.filter((card) => card.id !== action.cardId)

    case types.REMOVE_ROW:
      return state.map((card) => {
        if (card.id !== action.cardId) { return card }
        const rows = card.rows.filter(e => e.id !== action.rowId)
        return Object.assign({}, card, {rows})
      })

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

    case types.UPDATE_POSITION:
      return state.map((card) => {
        if (card.id !== action.card.id) { return card }
        return Object.assign(
          {},
          card,
          {position: {x: action.position.x, y: action.position.y}})
      })

    default:
      return state
  }
}
