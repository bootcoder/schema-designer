import { combineReducers } from 'redux'
import tables from './tableReducer'
import nav from './navReducer'

const rootReducer = combineReducers({
  tables,
  nav
})

export default rootReducer
