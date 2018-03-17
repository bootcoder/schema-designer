import React, { Component } from 'react'

class ConnectionPath extends Component {
  render () {
    const { start, end, color } = this.props
    // console.log(start)
    // console.log(end)
    if (Object.keys(start).length > 1) {
      const xMidPoint = Math.abs(start.x - end.x) / 2
      const yMidPoint = Math.abs(start.y - end.y) / 2
      // console.log(`xMid: ${xMidPoint}`)
      // console.log(`yMid: ${yMidPoint}`)

      var pathString = `M
        ${/* X,Y Start */''}
        ${start.x}
        ${start.y}

        C
        ${/* X,Y from Start */''}
        ${(start.x + xMidPoint)}
        ${start.y}

        ${(end.x - yMidPoint)}
        ${end.y}

        ${end.x}
        ${end.y}`
      return (
        <path
          d={pathString}
          stroke={color}
          strokeWidth='2.5'
          fill='transparent'
        />
      )
    }
  }
}

export default ConnectionPath
