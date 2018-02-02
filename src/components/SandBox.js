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
      <div className='container'>
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
        <div className='SandBox'>
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
