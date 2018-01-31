import React, { Component } from 'react'
import '../css/SideBar.css'

class SideBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleCreateTable = this.handleCreateTable.bind(this)
    this.handleAddRow = this.handleAddRow.bind(this)
    this.handleEditRow = this.handleEditRow.bind(this)
    this.handleRemoveRow = this.handleRemoveRow.bind(this)
    this.handleRemoveTable = this.handleRemoveTable.bind(this)
    this.handleMoveUp = this.handleMoveUp.bind(this)
    this.handleMoveDown = this.handleMoveDown.bind(this)
  }

  handleAddRow () {
    this.props.actions.addNewRow(this.props.nav.selectedTableId)
  }

  handleCreateTable () {
    let newTable = this.props.actions.createTable().table.id
    this.props.actions.selectTable(newTable)
  }

  handleEditRow () {
    this.props.actions.toggleEditRow(this.props.nav.selectedTableId, this.props.nav.selectedRowId)
  }

  handleMoveDown () {
    this.props.actions.moveDown(this.props.nav.selectedTableId, this.props.nav.selectedRowId)
  }

  handleMoveUp () {
    this.props.actions.moveUp(this.props.nav.selectedTableId, this.props.nav.selectedRowId)
  }

  handleRemoveTable () {
    if (window.confirm('Remove this table')) {
      this.props.actions.removeTable(this.props.nav.selectedTableId)
    }
  }

  handleRemoveRow () {
    this.props.actions.removeRow(this.props.nav.selectedTableId, this.props.nav.selectedRowId)
  }

  render () {
    return (
      <div className='SideBar'>
        <button onClick={this.handleCreateTable}>New Table</button>
        <button onClick={this.handleRemoveTable}>RM Table</button>
        <button onClick={this.handleAddRow}>Add Row</button>
        <button onClick={this.handleEditRow}>Edit Row</button>
        <button onClick={this.handleRemoveRow}>RM Row</button>
        <button onClick={this.handleMoveUp}>Row UP</button>
        <button onClick={this.handleMoveDown}>Row DN</button>
      </div>
    )
  }
}

export default SideBar
