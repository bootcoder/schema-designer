import React, { Component } from 'react'

class Row extends Component {
  render () {
    const details = this.props.details
    return (
      <div
        className={details.selected ? 'Row selected-row' : 'Row'}
        style={{backgroundColor: `${details.color}`}}
        onClick={() => this.props.actions.selectRow(this.props.table.id, details.id)} >
        {details.title}
      </div>
    )
  }
}

export default Row
