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
    this.props.actions.setIDAddFK(this.props.nav.selectedRowID)
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
    this.props.actions.setIDRemoveFK(this.props.nav.selectedRowID)
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
      <div className='Sidebar'>
        <input id='slide' type='checkbox' role='button' />
        <div className='container'>
          <label htmlFor='slide' className='toggle'>
            <img
              className='toggle-img'
              src={require('../images/arrow.png')}
              alt='slide' />
          </label>
          <div className='sidebar-content'>
            <ul>
              <div className='sidebar-break' />
              <li><a onClick={this.handleClearTables}>CL Tables</a></li>
              <li><a onClick={this.handleCreateTable}>New Table</a></li>
              <li><a onClick={this.handleRemoveTable}>RM Table</a></li>
              <div className='sidebar-break' />
              <li><a onClick={this.handleAddRow}>Add Row</a></li>
              <li><a onClick={this.handleEditRow}>Edit Row</a></li>
              <li><a onClick={this.handleRemoveRow}>RM Row</a></li>
              <div className='sidebar-break' />
              <li><a onClick={this.handleMoveUp}>Row UP</a></li>
              <li><a onClick={this.handleMoveDown}>Row DN</a></li>
              <div className='sidebar-break' />
              <li><a onClick={this.handleAddFK}>+ fn Key</a></li>
              <li><a onClick={this.handleRemoveFK}>- fn Key</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default SideBar
