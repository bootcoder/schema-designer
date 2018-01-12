import React, { Component } from 'react'
import '../css/SideBar.css'

class SideBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleCreateCard = this.handleCreateCard.bind(this)
    this.handleAddRow = this.handleAddRow.bind(this)
    this.handleRemoveRow = this.handleRemoveRow.bind(this)
  }

  handleCreateCard () {
    let newCard = this.props.actions.createCard().card
    this.props.actions.selectCard(newCard)
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
        <button onClick={this.handleAddRow}>Add Row</button>
        <button onClick={this.handleRemoveRow}>Rm Row</button>
      </div>
    )
  }
}

export default SideBar
