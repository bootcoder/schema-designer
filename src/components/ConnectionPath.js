import React, { Component } from 'react'

class ConnectionPath extends Component {
  render () {
    const { start, end } = this.props
    if (start.length > 1) {
      const xMidPoint = Math.abs(start[0].position.x - start[1].position.x) / 2
      const yMidPoint = Math.abs(start[0].position.y - start[1].position.y) / 2
      return (
        <path
          d={`M
            ${/* X,Y Start */''}
            ${start[0].position.x}
            ${start[0].position.y}
            C
            ${/* X,Y from Start */''}
            ${start[0].position.x + (xMidPoint + xMidPoint * 0.10)}
            ${start[0].position.y + (yMidPoint + yMidPoint * 0.10)},
            ${/* X,Y from End */''}
            ${start[1].position.x + (xMidPoint + xMidPoint * 0.10)}
            ${start[1].position.y + (yMidPoint + yMidPoint * 0.10)}
            ${/* X,Y End */''}
            ${start[1].position.x}
            ${start[1].position.y}`}
          stroke='yellow'
          stroke-width='2.5'
          fill='transparent' />
      )
    }
  }
}

export default ConnectionPath
