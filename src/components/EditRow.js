import React, { Component } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import '../css/EditRow.css'

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
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    let newState = Object.assign({}, this.props.details)
    newState[target.name] = value
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
      <div className='EditRow' style={{backgroundColor: `${this.props.dataTypes[details.dataType].color}`}}>
        <form onSubmit={this.handleSave} >
          <Select
            name='dataType'
            value={details.dataType}
            onChange={this.handleSelectChange}
            options={this.optionsFromDataTypes()}
            clearable={false}
          />

          <label htmlFor='name'><span>Name:<span className='required'>*</span></span>
            <input autoFocus
              id={details.id}
              className='input-field'
              name='title'
              onChange={this.handleChange}
              onFocus={(e) => e.target.select()}
              type='text'
              value={details.title}
            />
          </label>

          <label htmlFor='size'><span>Size:</span>
            <input
              className='input-field'
              name='size'
              onChange={this.handleChange}
              type='number'
              value={details.size}
            />
          </label>
          <label htmlFor='default'><span>Default:</span>
            <input
              className='input-field'
              name='default'
              onChange={this.handleChange}
              type='text'
              value={details.default}
            />
          </label>
          <div className='checkbox'>
            <input
              defaultChecked={details.autoincrement}
              name='autoincrement'
              onChange={this.handleChange}
              type='checkbox'
              value={details.autoincrement}
            />
            <span>Auto Increment</span>
          </div>
          <div className='checkbox'>
            <input
              defaultChecked={details.allow_null}
              name='allow_null'
              onChange={this.handleChange}
              type='checkbox'
              value={details.allow_null}
            />
            <span>Allow NULL</span>
          </div>

          <label><input type='submit' value='Save Row' /></label>
        </form>
      </div>
    )
  }
}

export default EditRow
