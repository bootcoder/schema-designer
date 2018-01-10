import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import PropTypes from 'prop-types'
import Header from './components/Header'
import SandBox from './components/SandBox'
import './App.css'

class App extends Component {
  render () {
    return (
      <Router >
        <div className='App'>
          <Header />
          <Route exact path='/' component={SandBox} />
          <Route path='/schemas/:schemaId' component={SandBox} />
        </div>
      </Router>
    )
  }
}

export default App
