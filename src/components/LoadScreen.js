import React, { Component } from 'react'
import '../css/LoadScreen.css'

class LoadScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      payload: '',
      localTables: JSON.parse(window.localStorage.getItem('tables') || '[]')
    }

    this.clearLocalStorage = this.clearLocalStorage.bind(this)
    this.displayLocalStorageLoadButton = this.displayLocalStorageLoadButton.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  clearLocalStorage () {
    window.localStorage.removeItem('tables')
    this.setState({localTables: []})
  }

  componentDidMount () {
    this.textarea.focus()
  }

  handleChange (e) {
    let payload = e.target.value
    this.setState({payload})
  }

  handleSave () {
    const tables = this.props.saveSchemaToLocalStorage()
    const payload = JSON.stringify(tables, null, '\t')
    this.setState({payload, localTables: tables})
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.loadSchemaFromJSON(this.state.payload)
  }

  displayLocalStorageLoadButton () {
    if (this.state.localTables.length) {
      return (
        <div>
          <p>Found {this.state.localTables.length} tables in local storage.</p>
          <p>Would you like to load these now?</p>
          <button className='load-btn' onClick={this.props.loadSchemaFromLocalStorage}>Load Local Storage</button>
          <button className='danger-btn' onClick={this.clearLocalStorage}>CLEAR Local Storage</button>
        </div>
      )
    }
  }

  render () {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const divStyle = {
      marginLeft: windowWidth / 5,
      marginTop: windowHeight / 10
    }

    return (
      <div className='LoadScreen' style={divStyle}>
        <h4>Save / Load<button onClick={this.props.setDefaultSandboxView}>X</button></h4>
        <button onClick={this.handleSave}>Save Schema / Generate JSON</button>
        {this.displayLocalStorageLoadButton()}
        <hr />
        <p>Paste or copy Schema JSON here.</p>
        <form onSubmit={this.handleSubmit}>
          <textarea
            rows='15'
            cols='60'
            ref={(input) => { this.textarea = input }}
            value={this.state.payload}
            onChange={this.handleChange}
          />
          <br />
          <input type='submit' value='Load Schema' />
        </form>
      </div>
    )
  }
}

export default LoadScreen
