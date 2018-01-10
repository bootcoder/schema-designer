import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import SideBar from './SideBar'
import Draggable, { DraggableCore } from 'react-draggable'
import '../css/SandBox.css'

class SandBox extends Component {
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
              defaultPosition={{x:200, y:200}}
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

SandBox.propTypes = {

}

export default SandBox
