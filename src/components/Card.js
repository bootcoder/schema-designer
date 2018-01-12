import React, { Component } from 'react'
import Draggable, { DraggableCore } from 'react-draggable'
import Row from './Row'
import '../css/Card.css'

class Card extends Component {
  constructor (props, context) {
    super(props, context)

    this.displayRow = this.displayRow.bind(this)
    this.selectCard = this.selectCard.bind(this)
  }

  displayRow (row, index) {
    return (
      <Row
        actions={this.props.actions}
        card={this.props.details}
        details={row}
        key={index}
      />
    )
  }

  selectCard () {
    this.props.actions.selectCard(this.props.details)
  }

  render () {
    const details = this.props.details

    return (
      <Draggable
        bounds='parent'
        defaultPosition={{x: details.position.x, y: details.position.y}}
        handle='.handle'>
        <div
          className={details.selected ? 'Card selected-card' : 'Card'}
          onClick={this.selectCard}
          >
          <p className='handle'>{details.title}</p>
          {details.rows.map(this.displayRow)}
        </div>
      </Draggable>
    )
  }
}

export default Card
