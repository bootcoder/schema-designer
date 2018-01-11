import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import '../css/SideBar.css'

class SideBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleCreateCard = this.handleCreateCard.bind(this)
    this.handleAddRow = this.handleAddRow.bind(this)
  }

  handleCreateCard () {
    let newCard = this.props.actions.createCard().card
    this.props.actions.selectCard(newCard)
  }

  handleAddRow () {
    this.props.actions.addRow(this.props.nav.selectedCardId)
  }

  render () {
    return (
      <div className='SideBar'>
        <button onClick={this.handleCreateCard}>New Table</button>
        <button onClick={this.handleAddRow}>Add Row</button>
      </div>
    )
  }
}

export default SideBar
