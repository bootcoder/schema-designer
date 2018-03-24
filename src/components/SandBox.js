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
    return this.props.tables.map(table => {
      if (table.connectionCount > 0) {
        return this.renderTableConnectionPath(table)
      } else { return table }
    })
  }

  renderTableConnectionPath (table) {
    return table.rows.map(row => {
      if (Object.keys(row.connections.outbound).length < 1) { return null }

      return Object.keys(row.connections.outbound).map(connection => {
        const {start, end} = this.setAnchors(row.position, row.connections.outbound[connection])
        return (
          <ConnectionPath
            key={connection}
            start={start}
            end={end}
            color={row.connectionColor}
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

  setAnchors (start, end) {
    let clnStart = Object.assign({}, start)
    let clnEnd = Object.assign({}, end)
    let startLeft = Math.floor(clnStart.x)
    let startRight = Math.floor(clnStart.x + clnStart.width)
    let endLeft = Math.floor(clnEnd.x)
    let endRight = Math.floor(endLeft + clnEnd.width)
    // Reset under flag value - it is only used here and ConnectionPath
    clnStart.under = false

    // Full Left - Set start anchor left
    if (startLeft < endLeft && startRight < endLeft) {
      // console.log('full left')
      clnStart.x += clnStart.width

    // Mid Left - Set under flag true
    } else if (startLeft < endLeft && startRight > endLeft) {
      // console.log('mid left')
      clnStart.under = true

    // Mid Right - Set under flag true - Set both anchors right
    } else if (startLeft < endRight && startRight > endRight) {
      // console.log('mid right')
      clnStart.under = true
      clnStart.x += clnStart.width
      clnEnd.x += clnEnd.width

    // Full Right - Set end anchor right
    } else if (startLeft > endRight) {
      // console.log('full right')
      clnEnd.x += clnEnd.width
    }

    clnStart.y += (clnStart.height / 2)
    clnEnd.y += (clnEnd.height / 2)
    return { start: clnStart, end: clnEnd }
  }

  render () {
    return (
      <div className='app-container'>
        <SideBar actions={this.props.actions} nav={this.props.nav} />
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
