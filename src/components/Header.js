import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/Header.css'

class Header extends Component {
  render () {
    return (
      <header className='Header'>
        <Link to='/'>Schemalator 5000</Link>
      </header>
    )
  }
}

export default Header
