import React, { Component } from 'react'
import Draggable from 'react-draggable'
import Row from './Row'
import EditRow from './EditRow'
import '../css/Table.css'

class Table extends Component {
  constructor (props, context) {
    super(props, context)

    this.displayRow = this.displayRow.bind(this)
    this.displayTableName = this.displayTableName.bind(this)
    this.displayTableOptions = this.displayTableOptions.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleUpdateName = this.handleUpdateName.bind(this)
    this.saveName = this.saveName.bind(this)
    this.toggleEditTable = this.toggleEditTable.bind(this)
  }

  displayRow (row, index) {
    return row.edit
      ? <EditRow
        actions={this.props.actions}
        dataTypes={this.props.nav.dataType}
        details={row}
        key={row.id}
        table={this.props.details}
      />
      : <Row
        actions={this.props.actions}
        dataTypes={this.props.nav.dataType}
        details={row}
        key={row.id}
        table={this.props.details}
      />
  }

  displayTableName () {
    if (this.props.details.edit) {
      return (
        <form onSubmit={this.saveName} >
          <input autoFocus
            type='text'
            name='name'
            onChange={this.handleUpdateName}
            onFocus={(e) => e.target.select()}
            value={this.props.details.name}
          />
        </form>
      )
    } else {
      return <p onDoubleClick={this.toggleEditTable} className='handle'>{this.props.details.name}</p>
    }
  }

  displayTableOptions () {
    return (
      <div className='table-options'>
        <span onClick={() => console.log('twas clicked')}>+</span>
      </div>
    )
  }

  handleDrag (e, data) {
    // IF not the currently selected table
    // Disable edit, save and select this table.
    if (this.props.nav.selectedTableID !== this.props.details.id) {
      this.props.actions.disableEditAndSave()
      this.props.actions.selectTable(this.props.details.id)
    }
    // IF table has connections
    // Iterate over each row and each connection
    // console.log('*******************************************')
    if (this.props.details.connectionCount > 0) {
      // Update the table position
      this.props.actions.updatePosition(this.props.details.id, data)
      this.props.details.rows.map(row => {
        // Update all remote connections
        Object.keys(row.connections.inbound).map(connectionRowID => {
          // console.log('update inbound')
          return this.props.actions.updateInboundConnectionOrigin(connectionRowID, row, data)
        })
        // Update current row position
        return this.props.actions.updateRow(row)
      })
    }
  }

  handleStop (e, data) {
    if (this.props.nav.selectedTableID !== this.props.details.id) {
      this.props.actions.disableEditAndSave()
      this.props.actions.selectTable(this.props.details.id)
    }
    this.props.actions.updatePosition(this.props.details.id, data)
  }

  handleUpdateName (event) {
    let newState = Object.assign({}, this.props.details, {name: event.target.value})
    this.props.actions.updateTable(newState)
  }

  saveName (event) {
    event.preventDefault()
    let newState = Object.assign({}, this.props.details, {edit: false})
    this.props.actions.updateTable(newState)
  }

  toggleEditTable () {
    let newState = Object.assign({}, this.props.details, {edit: !this.props.details.edit})
    console.log(newState)
    this.props.actions.updateTable(newState)
  }

  render () {
    const details = this.props.details

    return (
      <Draggable
        bounds='parent'
        position={{x: details.position.x, y: details.position.y}}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
        handle='.handle' >
        <div
          id={details.id}
          className={details.selected ? 'Table selected-table' : 'Table'}>
          {this.displayTableName()}
          {/* {this.displayTableOptions()} */}
          {details.rows.map(this.displayRow)}
        </div>
      </Draggable>
    )
  }
}

export default Table
