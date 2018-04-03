import React, { Component } from 'react'
import '../css/LoadScreen.css'

class LoadScreen extends Component {
  constructor (props) {
    super(props)

    this.state = { payload: '' }

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
            rows='50'
            cols='100'
            ref={(input) => { this.textarea = input }}
            value={this.state.payload}
            onChange={this.handleChange}
          />
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default LoadScreen
