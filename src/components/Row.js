import React, { Component } from 'react'
import * as cardActions from '../actions/cardActions'

class Row extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      row: this.props.details
    }
  }

  render () {
    const details = this.props.details
    return (
      <div className='Row' style={{backgroundColor: `${details.color}`}}>
        {details.title}
      </div>
    )
  }
}

Row.propTypes = {

}

export default Row
