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
      return (
        <path
          d={`M
            ${/* X,Y Start */''}
            ${start.x}
            ${start.y}
            C
            ${/* X,Y from Start */''}
            ${start.x + (xMidPoint + xMidPoint * 0.10)}
            ${start.y + (yMidPoint + yMidPoint * 0.10)},
            ${/* X,Y from End */''}
            ${end.x + (xMidPoint + xMidPoint * 0.10)}
            ${end.y + (yMidPoint + yMidPoint * 0.10)}
            ${/* X,Y End */''}
            ${end.x}
            ${end.y}`}
          stroke={color}
          strokeWidth='2.5'
          fill='transparent' />
      )
    }
  }
}

export default ConnectionPath
