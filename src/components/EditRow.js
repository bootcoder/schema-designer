import React, { Component } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class EditRow extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.optionsFromDataTypes = this.optionsFromDataTypes.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  optionsFromDataTypes () {
    let options = []
    Object.keys(this.props.dataTypes).map((dataType, idx) => {
      options.push({value: dataType, label: dataType})
    })
    return options
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

  handleSelectChange (selectedOption) {
    let newState = Object.assign({}, this.props.details)
    newState.dataType = selectedOption.value
    this.props.actions.updateRow(newState)
  }

  render () {
    const details = this.props.details
    return (
      <div className='EditRow'>
        <form onSubmit={this.handleSave} >
          <div>
            DataType:
            <Select
              name='dataType'
              value={details.dataType}
              onChange={this.handleSelectChange}
              options={this.optionsFromDataTypes()}
              clearable={false}
            />
          </div>
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
            Size:
            <input
              name='size'
              onChange={this.handleChange}
              type='number'
              value={details.size}
            />
          </div>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default EditRow
