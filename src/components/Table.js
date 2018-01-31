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
  }

  displayRow (row, index) {
    console.log(row.edit)
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

  handleDrag (e, data) {
    this.props.actions.selectTable(this.props.details.id)
    this.props.actions.updatePosition(this.props.details.id, data)
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
          <p className='handle'>{details.title}</p>
          {details.rows.map(this.displayRow)}
        </div>
      </Draggable>
    )
  }
}

export default Table
