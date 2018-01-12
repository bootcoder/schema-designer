import React, { Component } from 'react'
import '../css/SideBar.css'

class SideBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleCreateCard = this.handleCreateCard.bind(this)
    this.handleAddRow = this.handleAddRow.bind(this)
    this.handleRemoveRow = this.handleRemoveRow.bind(this)
    this.handleRemoveCard = this.handleRemoveCard.bind(this)
  }

  handleCreateCard () {
    let newCard = this.props.actions.createCard().card
    this.props.actions.selectCard(newCard)
  }

  handleRemoveCard () {
    if (window.confirm('Remove this table')) {
      this.props.actions.removeCard(this.props.nav.selectedCardId)
    }
  }

  handleAddRow () {
    this.props.actions.addRow(this.props.nav.selectedCardId)
  }

  handleRemoveRow () {
    this.props.actions.removeRow(this.props.nav.selectedCardId, this.props.nav.selectedRowId)
  }

  render () {
    return (
      <div className='SideBar'>
        <button onClick={this.handleCreateCard}>New Table</button>
        <button onClick={this.handleRemoveCard}>RM Table</button>
        <button onClick={this.handleAddRow}>Add Row</button>
        <button onClick={this.handleRemoveRow}>RM Row</button>
      </div>
    )
  }
}

export default SideBar
