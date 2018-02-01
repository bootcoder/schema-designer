import React, { Component } from 'react'
import Draggable from 'react-draggable'
import Row from './Row'
import EditRow from './EditRow'
import '../css/Table.css'

class Table extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = Object.assign({}, this.props.details)

    this.displayRow = this.displayRow.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleUpdateTitle = this.handleUpdateTitle.bind(this)
    this.saveTitle = this.saveTitle.bind(this)
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
    if (this.state.edit) {
      return (
        <form onSubmit={this.saveTitle} >
          <input
            type='text'
            name='title'
            onChange={this.handleUpdateTitle}
            value={this.state.title}
          />
        </form>
      )
    } else {
      return <p onDoubleClick={this.toggleEditTable} className='handle'>{this.state.title}</p>
    }
  }

  handleDrag (e, data) {
    this.props.actions.selectTable(this.props.details.id)
    this.props.actions.updatePosition(this.props.details.id, data)
  }

  handleUpdateTitle (event) {
    let newState = Object.assign({}, this.state, {title: event.target.value})
    this.setState(newState)
  }

  saveTitle () {
    let newState = Object.assign({}, this.state, {edit: false})
    this.setState(newState)
    this.props.actions.updateTableTitle(newState.id, newState.title)
  }

  toggleEditTable () {
    let newState = Object.assign({}, this.state, {edit: !this.state.edit})
    this.setState(newState)
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
