import React, { Component } from 'react'
import '../css/LoadScreen.css'

class LoadScreen extends Component {
  constructor (props) {
    super(props)

    this.state = { payload: '' }

    this.displayLocalStorageLoadButton = this.displayLocalStorageLoadButton.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.textarea.focus()
  }

  handleChange (e) {
    let payload = e.target.value
    this.setState({payload})
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.loadSchemaFromJSON(this.state.payload)
  }

  displayLocalStorageLoadButton () {
    const localTables = window.localStorage.getItem('tables')
    if (localTables) {
      let tables = JSON.parse(localTables)
      return (
        <div>
          <p>Found {tables.length} tables in local storage, would you like to load these now?</p>
          <button onClick={this.props.loadSchemaFromLocalStorage}>Load Local Storage</button>
        </div>
      )
    }
  }

  render () {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const divStyle = {
      marginLeft: windowWidth / 5,
      marginTop: windowHeight / 5
    }

    return (
      <div className='LoadScreen' style={divStyle}>
        <p>LoadScreen</p>
        <form onSubmit={this.handleSubmit}>
          <textarea
            rows='30'
            cols='50'
            ref={(input) => { this.textarea = input }}
            value={this.state.payload}
            onChange={this.handleChange}
          />
          {this.displayLocalStorageLoadButton()}
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default LoadScreen
