import React, { Component } from 'react';
import Draggable, { DraggableCore } from 'react-draggable'
import Header from './components/Header'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <Draggable
          handle='.handle'>
          <div className='card'>
            <p class='handle'>Some stuff</p>
            <div className='card-element'>
              Card 1
            </div>

            <div className='card-element'>
              Card 1
            </div>
          </div>
        </Draggable>
      </div>
    )
  }
}

export default App
