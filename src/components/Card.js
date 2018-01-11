import React, { Component } from 'react'
import * as cardActions from '../actions/cardActions'
import Draggable, { DraggableCore } from 'react-draggable'

class Card extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      cards: []
    }
  }

  render () {
    return (
      <Draggable
        bounds='parent'
        defaultPosition={{x: 200, y: 200}}
        handle='.handle'>
        <div className='card'>
          <p className='handle'>Some stuff</p>
          <div className='card-element'>
            Feild 1
          </div>
          <div className='card-element'>
            Feild 2
          </div>
        </div>
      </Draggable>
    )
  }
}

Card.propTypes = {

}

export default Card
