import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cardActions from '../actions/cardActions'
import SideBar from './SideBar'
import Draggable, { DraggableCore } from 'react-draggable'
import '../css/SandBox.css'

class SandBox extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      cards: []
    }
  }

  render () {
    return (
      <div className='container'>
        <input id='toggle-sidebar' type='checkbox' role='button' />
        <label htmlFor='toggle-sidebar'><img className='toggle-img' src={require('../images/arrow.png')} alt='toggle-sidebar' /></label>
        <SideBar />
        <div className='SandBox'>
          <div className='grid'>
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
          </div>
        </div>
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

SandBox.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SandBox)
