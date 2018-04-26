import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tableActions from '../actions/tableActions'
import * as navActions from '../actions/navActions'
import SideBar from './SideBar'
import Header from './Header'
import LoadScreen from './LoadScreen'
import ConnectionPath from './ConnectionPath'
import Table from './Table'

class SandBox extends Component {
  constructor (props, context) {
    super(props, context)

    this.displayTable = this.displayTable.bind(this)
    this.displayLoadScreen = this.displayLoadScreen.bind(this)
    this.handleWindowResize = this.handleWindowResize.bind(this)
    this.handleEscape = this.handleEscape.bind(this)
    this.renderAllConnectionPaths = this.renderAllConnectionPaths.bind(this)
    this.renderTableConnectionPath = this.renderTableConnectionPath.bind(this)
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleWindowResize, false)
    window.addEventListener('keyup', this.handleEscape, false)
    this.handleWindowResize()
  }

  handleEscape (e) {
    e = e || window.event
    var escapePressed = false
    if ('key' in e) {
      escapePressed = (e.key === 'Escape' || e.key === 'Esc')
    } else {
      escapePressed = (e.keyCode === 27)
    }
    if (escapePressed) { this.props.actions.setDefaultSandboxView() }
  }

  handleWindowResize () {
    if (this.props.nav.customSize === false) {
      this.props.actions.resizeSandbox(window.innerWidth, window.innerHeight)
    }
  }

  renderAllConnectionPaths () {
    return this.props.tables.map(table => {
      if (table.connectionCount > 0) {
        return this.renderTableConnectionPath(table)
      }
      return null
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

  displayLoadScreen () {
    if (this.props.nav.displayLoadScreen === true) {
      return (
        <LoadScreen
          loadSchemaFromJSON={this.props.actions.loadSchemaFromJSON}
          loadSchemaFromLocalStorage={this.props.actions.loadSchemaFromLocalStorage}
          saveSchemaToLocalStorage={this.props.actions.saveSchemaToLocalStorage}
          setDefaultSandboxView={this.props.actions.setDefaultSandboxView}
        />
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
      clnStart.x += clnStart.width

    // Mid Left - Set under flag true
    } else if (startLeft < endLeft && startRight > endLeft) {
      clnStart.under = true

    // Mid Right - Set under flag true - Set both anchors right
    } else if (startLeft < endRight && startRight > endRight) {
      clnStart.under = true
      clnStart.x += clnStart.width
      clnEnd.x += clnEnd.width

    // Full Right - Set end anchor right
    } else if (startLeft > endRight) {
      clnEnd.x += clnEnd.width
    }

    clnStart.y += (clnStart.height / 2)
    clnEnd.y += (clnEnd.height / 2)
    return { start: clnStart, end: clnEnd }
  }

  render () {
    return (
      <div className='app-container'>
        <Header nav={this.props.nav} />
        <SideBar actions={this.props.actions} nav={this.props.nav} />
        {this.displayLoadScreen()}
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
