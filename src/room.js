// React
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'
import wisdom from 'bob-ross-lipsum'

// custom components
import Message from './pieces/message'

// Material UI
import { List } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

export default class Room extends React.Component {
  constructor(props) {
    super()

    // in the future, this will fetch messages from the server,
    // but for now we're just generating them on the fly
    var messages = []
    for(var i = 0; i < Math.floor(Math.random() * 10) + 1; i ++) {
      messages.push(wisdom())
    }
    this.state = {
      messages: messages
    }
  }

  renderMessages() {
    const result = this.state.messages.map((message, i) => {
      return(
        <Message content = { message }
                  key = { this.props.params.roomId + i }
                  avatar = { i } />
      )
    })
    return result
  }

  render() {

    return(
      <div>
        <span>This is a room for { this.props.params.roomId }</span>
        <List>
          { this.renderMessages() }
        </List>
      </div>
    )
  }
}
