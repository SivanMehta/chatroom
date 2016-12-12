// React
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

// icons
export default class Room extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <span>This is a room for { this.props.params.roomId }</span>
    )
  }
}
