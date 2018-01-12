import React, { Component } from 'react'
import Draggable from 'react-draggable'
import Row from './Row'
import '../css/Table.css'

class Table extends Component {
  constructor (props, context) {
    super(props, context)

    this.displayRow = this.displayRow.bind(this)
    this.selectTable = this.selectTable.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
  }

  displayRow (row, index) {
    return (
      <Row
        actions={this.props.actions}
        table={this.props.details}
        details={row}
        key={index}
      />
    )
  }

  selectTable () {
    this.props.actions.selectTable(this.props.details)
  }

  handleDrag (e, data) {
    this.props.actions.updatePosition(this.props.details, data)
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
          className={details.selected ? 'Table selected-table' : 'Table'}
          onClick={this.selectTable} >
          <p className='handle'>{details.title}</p>
          {details.rows.map(this.displayRow)}
        </div>
      </Draggable>
    )
  }
}

export default Table
