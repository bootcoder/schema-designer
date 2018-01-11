import { combineReducers } from 'redux'
import cards from './cardReducer'
import nav from './navReducer'

const rootReducer = combineReducers({
  cards,
  nav
})

export default rootReducer
