import React, { Component } from 'react'

class EditRow extends Component {
  constructor (props) {
    super(props)

    this.state = this.props.details

    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleChange (event) {
    let newState = Object.assign({}, this.state)
    newState[event.target.name] = event.target.value
    this.setState(newState)
  }

  handleSave (event) {
    event.preventDefault()
    this.props.actions.updateRow(this.state)
  }

  render () {
    const details = this.state
    return (
      <div className='EditRow'>
        <form onSubmit={this.handleSave} >
          <div>
            Name:
            <input
              id='title'
              name='title'
              type='text'
              value={details.title}
              onChange={this.handleChange}
            />
          </div>
          <div>
            DataType:
            <select>
              <option value='text'>Text</option>
              <option value='string'>String</option>
            </select>
          </div>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default EditRow
