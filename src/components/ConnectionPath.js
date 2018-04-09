import React, { Component } from 'react'

class ConnectionPath extends Component {
  render () {
    const { start, end, color } = this.props
    if (Object.keys(start).length > 1) {
      const half = Math.floor((end.x - start.x) / 2)
      const startHalf = start.under === true ? start.x - (half * 2) : start.x + half

      var pathString = `M
        ${/* X,Y Start */''}
        ${start.x}
        ${start.y}

        C
        ${/* Curve X,Y from Start */''}
        ${startHalf}
        ${start.y}

        ${/* Curve X,Y from End */''}
        ${(end.x - half)}
        ${end.y}

        ${/* X,Y End */''}
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
