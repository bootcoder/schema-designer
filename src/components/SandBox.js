import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tableActions from '../actions/tableActions'
import SideBar from './SideBar'
import Table from './Table'
import '../css/SandBox.css'

class SandBox extends Component {
  constructor (props, context) {
    super(props, context)

    this.displayTable = this.displayTable.bind(this)
    this.renderConnectionPaths = this.renderConnectionPaths.bind(this)
  }

  renderConnectionPaths () {
    if (this.props.tables.length > 1) {
      const xMidPoint = Math.abs(this.props.tables[0].position.x - this.props.tables[1].position.x) / 2
      const yMidPoint = Math.abs(this.props.tables[0].position.y - this.props.tables[1].position.y) / 2
      return (
        <path
          d={`M
            ${/* X,Y Start */''}
            ${this.props.tables[0].position.x}
            ${this.props.tables[0].position.y}
            C
            ${/* X,Y from Start */''}
            ${this.props.tables[0].position.x + (xMidPoint + xMidPoint * 0.10)}
            ${this.props.tables[0].position.y + (yMidPoint + yMidPoint * 0.10)},
            ${/* X,Y from End */''}
            ${this.props.tables[1].position.x + (xMidPoint + xMidPoint * 0.10)}
            ${this.props.tables[1].position.y + (yMidPoint + yMidPoint * 0.10)}
            ${/* X,Y End */''}
            ${this.props.tables[1].position.x}
            ${this.props.tables[1].position.y}`}
          stroke='yellow'
          stroke-width='2.5'
          fill='transparent' />
      )
    }
  }

  displayTable (table, index) {
    return (
      <Table
        actions={this.props.actions}
        details={table}
        key={index}
        nav={this.props.nav}
      />
    )
  }

  render () {
    return (
      <div className='container app-container'>
        <input id='toggle-sidebar' type='checkbox' role='button' />
        <label htmlFor='toggle-sidebar'>
          <img
            className='toggle-img'
            src={require('../images/arrow.png')}
            alt='toggle-sidebar' />
        </label>
        <SideBar
          actions={this.props.actions}
          nav={this.props.nav}
        />
        <div className='SandBox' style={{width: this.props.nav.windowWidth, height: this.props.nav.windowHeight}} >
          <svg id='svg-container' style={{width: this.props.nav.windowWidth, height: this.props.nav.windowHeight}} >
            {this.renderConnectionPaths()}
          </svg>
          <div className='grid'>
            {this.props.tables.map(this.displayTable)}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    tables: state.tables,
    nav: state.nav
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(tableActions, dispatch)
  }
}

SandBox.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SandBox)
