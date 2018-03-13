import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tableActions from '../actions/tableActions'
import * as navActions from '../actions/navActions'
import SideBar from './SideBar'
import ConnectionPath from './ConnectionPath'
import Table from './Table'
import '../css/SandBox.css'

class SandBox extends Component {
  constructor (props, context) {
    super(props, context)

    this.displayTable = this.displayTable.bind(this)
    this.renderAllConnectionPaths = this.renderAllConnectionPaths.bind(this)
    this.renderTableConnectionPath = this.renderTableConnectionPath.bind(this)
  }

  renderAllConnectionPaths () {
    this.props.tables.map(table => {
      return this.renderTableConnectionPath(table)
    })
  }

  renderTableConnectionPath (table) {
    return table.rows.map(row => {
      const color = 'red' // NOTE: comeback to make this dynorandomite.
      row.connections.length && row.connections.map(connection => {
        const start = row.position // NOTE: need to build a function to attach this point to either the left or right side of the row box not the center as current.
        const end = connection.position
        return (
          <ConnectionPath
            start={start}
            end={end}
            color={color}
          />
        )
      })
    })
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
            {this.renderAllConnectionPaths()}
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
    actions: bindActionCreators(Object.assign({}, tableActions, navActions), dispatch)
  }
}

SandBox.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SandBox)
