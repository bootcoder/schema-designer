import React, { Component } from 'react'
import '../css/SideBar.css'

class SideBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleAddFK = this.handleAddFK.bind(this)
    this.handleAddRow = this.handleAddRow.bind(this)
    this.handleCreateTable = this.handleCreateTable.bind(this)
    this.handleClearTables = this.handleClearTables.bind(this)
    this.handleEditRow = this.handleEditRow.bind(this)
    this.handleMoveDown = this.handleMoveDown.bind(this)
    this.handleMoveUp = this.handleMoveUp.bind(this)
    this.handleRemoveFK = this.handleRemoveFK.bind(this)
    this.handleRemoveRow = this.handleRemoveRow.bind(this)
    this.handleRemoveTable = this.handleRemoveTable.bind(this)
  }

  handleAddFK () {
    // set a nav state to pending key placement
    // will need to store the origin data in nav state as well
    // now on select row have to check for nav state.
    // if pending key then write connection data to both points.
    // else continue on as the norm
    this.props.actions.setForeignKeyOfOriginRow(this.props.nav.selectedRowID)
  }

  handleAddRow () {
    this.props.actions.addNewRow(this.props.nav.selectedTableID)
  }

  handleCreateTable () {
    this.props.actions.createTable()
  }

  handleClearTables () {
    if (window.confirm('Clear All Tables?')) {
      this.props.actions.clearTables()
    }
  }

  handleEditRow () {
    this.props.actions.toggleEditRow(this.props.nav.selectedTableID, this.props.nav.selectedRowID)
  }

  handleMoveDown () {
    this.props.actions.moveDown(this.props.nav.selectedTableID, this.props.nav.selectedRowID)
  }

  handleMoveUp () {
    this.props.actions.moveUp(this.props.nav.selectedTableID, this.props.nav.selectedRowID)
  }

  handleRemoveFK () {
    this.props.actions.removeKey(this.props.nav.selectedTableID, this.props.nav.selectedRowID)
  }

  handleRemoveRow () {
    this.props.actions.removeRow(this.props.nav.selectedTableID, this.props.nav.selectedRowID)
  }

  handleRemoveTable () {
    if (window.confirm('Remove this table')) {
      this.props.actions.removeTable(this.props.nav.selectedTableID)
    }
  }

  render () {
    return (
      <div className='SideBar'>
        <div className='sidebar-break' />
        <button onClick={this.handleClearTables}>CL Tables</button>
        <button onClick={this.handleCreateTable}>New Table</button>
        <button onClick={this.handleRemoveTable}>RM Table</button>
        <div className='sidebar-break' />
        <button onClick={this.handleAddRow}>Add Row</button>
        <button onClick={this.handleEditRow}>Edit Row</button>
        <button onClick={this.handleRemoveRow}>RM Row</button>
        <div className='sidebar-break' />
        <button onClick={this.handleMoveUp}>Row UP</button>
        <button onClick={this.handleMoveDown}>Row DN</button>
        <div className='sidebar-break' />
        <button onClick={this.handleAddFK}>+ fn Key</button>
        <button onClick={this.handleRemoveFK}>- fn Key</button>
      </div>
    )
  }
}

export default SideBar
