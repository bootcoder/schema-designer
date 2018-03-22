import React, { Component } from 'react'

class ConnectionPath extends Component {
  render () {
    const { start, end, color } = this.props
    // console.log(start)
    // console.log(end)
    if (Object.keys(start).length > 1) {
      const half = Math.floor((end.x - start.x) / 2)
      // console.log(`xMid: ${xMidPoint}`)
      // console.log(`yMid: ${yMidPoint}`)

      var pathString = `M
        ${/* X,Y Start */''}
        ${start.x}
        ${start.y}

        C
        ${/* Curve X,Y from Start */''}
        ${(start.x + half)}
        ${start.y}

        ${/* Curve X,Y from End */''}
        ${(end.x - half)}
        ${end.y}

        ${/* X,Y End */''}
        ${end.x}
        ${end.y}`
        console.log(pathString)

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
