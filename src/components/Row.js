import React, { Component } from 'react'

class Row extends Component {
  constructor (props) {
    super(props)
    this.constructClassName = this.constructClassName.bind(this)
    this.displayTitle = this.displayTitle.bind(this)
  }

  constructClassName () {
    const selected = this.props.details.selected ? 'Row selected-row' : 'Row'
    return `${this.props.details.id} ${selected}`
  }

  displayTitle () {
    if (this.props.details.selected) {
      return (
        <span><span className='selected-title-left'>{'>'}</span>{this.props.details.title}<span className='selected-title-right'>{'<'}</span></span>
      )
    } else {
      return (<span>{this.props.details.title}</span>)
    }
  }

  render () {
    const details = this.props.details
    return (
      <div
        id={details.id}
        className={this.constructClassName()}
        style={{backgroundColor: `${this.props.dataTypes[details.dataType].color}`}}
        onClick={() => this.props.actions.selectRow(this.props.table.id, details.id)}
        onDoubleClick={() => this.props.actions.toggleEditRow(this.props.table.id, details.id)} >
        {this.displayTitle()}
      </div>
    )
  }
}

export default Row
