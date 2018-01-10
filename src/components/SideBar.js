import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cardActions from '../actions/cardActions'
import '../css/SideBar.css'

class SideBar extends Component {
  render () {
    return (
      <div className='SideBar'>
        <button onClick={this.props.actions.createCard}>Add Table</button>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    cards: state.cards
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(cardActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
