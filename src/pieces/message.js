import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

export default class Message extends React.Component {
  constructor() {
    super()
  }

  render() {
    return(
      <p>{this.props.content}</p>
    )
  }
}
