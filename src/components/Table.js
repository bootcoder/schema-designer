import React, { Component } from 'react'
import Draggable from 'react-draggable'
import Row from './Row'
import EditRow from './EditRow'
import '../css/Table.css'

class Table extends Component {
  constructor (props, context) {
    super(props, context)

    this.displayRow = this.displayRow.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleUpdateName = this.handleUpdateName.bind(this)
    this.saveName = this.saveName.bind(this)
    this.toggleEditTable = this.toggleEditTable.bind(this)
  }

  displayRow (row, index) {
    return row.edit
      ? <EditRow
        actions={this.props.actions}
        details={row}
        key={index}
        table={this.props.details}
      />
      : <Row
        actions={this.props.actions}
        details={row}
        key={index}
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

  handleDrag (e, data) {
    if (this.props.nav.selectedTableId !== this.props.details.id) {
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
        onStop={this.handleDrag}
        handle='.handle' >
        <div
          className={details.selected ? 'Table selected-table' : 'Table'}>
          {this.displayTableName()}
          {details.rows.map(this.displayRow)}
        </div>
      </Draggable>
    )
  }
}

export default Table
