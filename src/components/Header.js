import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render () {
    this.headerStyle = {
      width: this.props.nav.windowWidth
    }
    return (
      <header className='Header' style={this.headerStyle}>
        <ul className='nav-items'>
          <li className='nav-item'>
            <img
              className='construction-img'
              src={require('../images/construction.gif')}
              alt='Under Construction' />
          </li>
          <li className='nav-item'><Link to='/'>Schema Designer</Link></li>
          <li className='nav-item'>
            <img
              className='construction-img'
              src={require('../images/construction.gif')}
              alt='Under Construction' />
          </li>
          <li className='nav-item'>Under Construction</li>
          <li className='nav-item'>
            <img
              className='construction-img'
              src={require('../images/construction.gif')}
              alt='Under Construction' />
          </li>
          <li className='nav-item'><Link to='/'>Load / Clear tables to start</Link></li>
          <li className='nav-item'>
            <img
              className='construction-img'
              src={require('../images/construction.gif')}
              alt='Under Construction' />
          </li>
        </ul>
      </header>
    )
  }
}

export default Header
