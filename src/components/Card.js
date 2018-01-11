import React, { Component } from 'react'
import * as cardActions from '../actions/cardActions'
import Draggable, { DraggableCore } from 'react-draggable'
import Row from './Row'

class Card extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      card: this.props.details
    }

    this.displayRow = this.displayRow.bind(this)
  }

  displayRow (row, index) {
    return (
      <Row
        key={index}
        details={row}
      />
    )
  }

  render () {
    const details = this.props.details
    return (
      <Draggable
        bounds='parent'
        defaultPosition={{x: 200, y: 200}}
        handle='.handle'>
        <div className='card'>
          <p className='handle'>{details.title}</p>
          {details.rows.map(this.displayRow)}
        </div>
      </Draggable>
    )
  }
}

Card.propTypes = {

}

export default Card
