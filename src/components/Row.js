import React, { Component } from 'react'

class Row extends Component {
  constructor (props) {
    super(props)
    this.constructClassName = this.constructClassName.bind(this)
  }

  constructClassName () {
    const selected = this.props.details.selected ? 'Row selected-row' : 'Row'
    return `${this.props.details.id} ${selected}`
  }

  render () {
    const details = this.props.details
    return (
      <div
        className={this.constructClassName()}
        style={{backgroundColor: `${details.color}`}}
        onClick={() => this.props.actions.selectRow(this.props.table.id, details.id)}
        onDoubleClick={() => this.props.actions.toggleEditRow(this.props.table.id, details.id)} >
        {details.title}
      </div>
    )
  }
}

export default Row
