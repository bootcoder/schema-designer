import React, { Component } from 'react'
import '../css/SideBar.css'

class SideBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleCreateTable = this.handleCreateTable.bind(this)
    this.handleAddRow = this.handleAddRow.bind(this)
    this.handleRemoveRow = this.handleRemoveRow.bind(this)
    this.handleRemoveTable = this.handleRemoveTable.bind(this)
  }

  handleCreateTable () {
    let newTable = this.props.actions.createTable().table
    this.props.actions.selectTable(newTable)
  }

  handleRemoveTable () {
    if (window.confirm('Remove this table')) {
      this.props.actions.removeTable(this.props.nav.selectedTableId)
    }
  }

  handleAddRow () {
    this.props.actions.addRow(this.props.nav.selectedTableId)
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
        <button onClick={this.handleRemoveRow}>RM Row</button>
      </div>
    )
  }
}

export default SideBar
