import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Draggable, { DraggableCore } from 'react-draggable'
import '../css/SandBox.css'

class SandBox extends Component {
  render () {
    return (
      <div className='SandBox'>
        <div className='grid'>
          <Draggable
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
    )
  }
}

SandBox.propTypes = {

}

export default SandBox
