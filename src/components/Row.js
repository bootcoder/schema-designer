import React, { Component } from 'react'
import * as cardActions from '../actions/cardActions'

class Row extends Component {
  render () {
    const details = this.props.details
    return (
      <div
        className='Row'
        style={{backgroundColor: `${details.color}`}}
        onClick={() => this.props.actions.selectRow(details, this.props.card)} >
        {details.title}
      </div>
    )
  }
}

export default Row
