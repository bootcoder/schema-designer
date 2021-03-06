import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import SandBox from './components/SandBox'

const store = configureStore()

class App extends Component {
  render () {
    return (
      <Provider store={store} >
        <Router >
          <div className='App'>
            <Route exact path='/' component={SandBox} />
            <Route path='/schemas/:schemaID' component={SandBox} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
