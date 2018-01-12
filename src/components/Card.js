import React, { Component } from 'react'
import Draggable from 'react-draggable'
import Row from './Row'
import '../css/Card.css'

class Card extends Component {
  constructor (props, context) {
    super(props, context)

    this.displayRow = this.displayRow.bind(this)
    this.selectCard = this.selectCard.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
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

  handleDrag (e, data) {
    this.props.actions.updatePosition(this.props.details, data)
  }

  render () {
    const details = this.props.details

    return (
      <Draggable
        bounds='parent'
        position={{x: details.position.x, y: details.position.y}}
        onStop={this.handleDrag}
        handle='.handle' >
        <div
          className={details.selected ? 'Card selected-card' : 'Card'}
          onClick={this.selectCard} >
          <p className='handle'>{details.title}</p>
          {details.rows.map(this.displayRow)}
        </div>
      </Draggable>
    )
  }
}

export default Card
