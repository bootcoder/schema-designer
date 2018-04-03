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
    this.handleLoadSchema = this.handleLoadSchema.bind(this)
    this.handleMoveDown = this.handleMoveDown.bind(this)
    this.handleMoveUp = this.handleMoveUp.bind(this)
    this.handleRemoveFK = this.handleRemoveFK.bind(this)
    this.handleRemoveRow = this.handleRemoveRow.bind(this)
    this.handleRemoveTable = this.handleRemoveTable.bind(this)
    this.handleSaveSchema = this.handleSaveSchema.bind(this)
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

  handleLoadSchema () {

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

  handleSaveSchema () {
    this.props.actions.saveSchemaToLocalStorage()
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
              <p className='sidebar-title'>Tables:</p>
              <a onClick={this.handleCreateTable}><li>New</li></a>
              <a onClick={this.handleClearTables}><li>Clear</li></a>
              <a onClick={this.handleRemoveTable}><li>Remove</li></a>
              <div className='sidebar-break' />
              <p className='sidebar-title'>Rows:</p>
              <a onClick={this.handleAddRow}><li>Add</li></a>
              <a onClick={this.handleEditRow}><li>Edit</li></a>
              <a onClick={this.handleRemoveRow}><li>Remove</li></a>
              <a onClick={this.handleMoveUp}><li>Up</li></a>
              <a onClick={this.handleMoveDown}><li>Down</li></a>
              <a onClick={this.handleAddFK}><li>+ FK</li></a>
              <a onClick={this.handleRemoveFK}><li>- FK</li></a>
              <div className='sidebar-break' />
              <p className='sidebar-title'>State:</p>
              <a onClick={this.handleSaveSchema}><li>Save</li></a>
              <a onClick={this.handleLoadSchema}><li>Load</li></a>
              <div className='sidebar-break' />
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default SideBar
