import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cardActions from '../actions/cardActions'
import SideBar from './SideBar'
import Card from './Card'
import '../css/SandBox.css'

class SandBox extends Component {
  constructor (props, context) {
    super(props, context)
    this.displayCard = this.displayCard.bind(this)
  }

  displayCard (card, index) {
    return (
      <Card
        key={index}
        details={card}
        actions={this.props.actions}
      />
    )
  }

  render () {
    return (
      <div className='container'>
        <input id='toggle-sidebar' type='checkbox' role='button' />
        <label htmlFor='toggle-sidebar'>
          <img
            className='toggle-img'
            src={require('../images/arrow.png')}
            alt='toggle-sidebar' />
        </label>
        <SideBar
          actions={this.props.actions}
          nav={this.props.nav} />
        <div className='SandBox'>
          <div className='grid'>
            {this.props.cards.map(this.displayCard)}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    cards: state.cards,
    nav: state.nav
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(cardActions, dispatch)
  }
}

SandBox.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SandBox)
