import React, { Component } from 'react'

class EditRow extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleChange (event) {
    let newState = Object.assign({}, this.props.details)
    newState[event.target.name] = event.target.value
    this.props.actions.updateRow(newState)
  }

  handleSave (event) {
    event.preventDefault()
    const newRow = Object.assign({}, this.props.details, {edit: false})
    this.props.actions.updateRow(newRow)
  }

  render () {
    const details = this.props.details
    return (
      <div className='EditRow'>
        <form onSubmit={this.handleSave} >
          <div>
            Name:
            <input autoFocus
              id={details.id}
              name='title'
              onChange={this.handleChange}
              onFocus={(e) => e.target.select()}
              type='text'
              value={details.title}
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
