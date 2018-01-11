import React, { Component } from 'react'
import * as cardActions from '../actions/cardActions'
import Draggable, { DraggableCore } from 'react-draggable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Row from './Row'
import '../css/Card.css'

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
    console.log('****************************!')
    // console.log(store)
    return (
      <Draggable
        bounds='parent'
        defaultPosition={{x: details.position.x, y: details.position.y}}
        handle='.handle'>
        <div className='card' onClick={() => this.props.actions.selectCard(details)}>
          <p className='handle'>{details.title}</p>
          {details.rows.map(this.displayRow)}
        </div>
      </Draggable>
    )
  }
}

// function mapStateToProps (state, ownProps) {
//   return {
//     cards: state.cards
//   }
// }
//
// function mapDispatchToProps (dispatch) {
//   return {
//     actions: bindActionCreators(cardActions, dispatch)
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Card)

export default Card
