import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/Header.css'

class Header extends Component {
  render () {
    return (
      <header className='Header'>
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
          <li className='nav-item'>Default tables until Github adpter completed.</li>
          <li className='nav-item'>
            <img
              className='construction-img'
              src={require('../images/construction.gif')}
              alt='Under Construction' />
          </li>
          <li className='nav-item'><Link to='/'>Clear tables to start.</Link></li>
        </ul>
      </header>
    )
  }
}

export default Header
