import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import '../css/SideBar.css'

class SideBar extends Component {
  render () {
    return (
      <div className='SideBar'>
        <button onClick={this.props.actions.createCard}>New Table</button>
        <button onClick={() => this.props.actions.addRow(this.props.nav.selectedCardId)}>Add Row</button>
      </div>
    )
  }
}

export default SideBar
