import React, { Component } from 'react';
import logo from './logo.svg';
import Draggable, { DraggableCore } from 'react-draggable'
import './App.css';

class App extends Component {
  constructor () {
    super()
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Draggable>
          <div className='card'>
            <p>Some stuff</p>
            <div className='card-element'>
              Card 1
            </div>

            <div className='card-element'>
              Card 1
            </div>
          </div>
        </Draggable>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
