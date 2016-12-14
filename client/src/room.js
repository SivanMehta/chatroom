// React
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

// additional components
import Message from './pieces/message'

// Material UI
import { List } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Formsy from 'formsy-react'
import FormsyText from 'formsy-material-ui/lib/FormsyText'
import 'whatwg-fetch'

export default class Room extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: []
    }

    socket.on('server:message', (message) => {
      this.fetchMessages()
    })

    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    this.fetchMessages()
  }

  componentWillReceiveProps() {
    this.fetchMessages()
  }

  fetchMessages() {
    // in the future, this will fetch messages from the server,
    // but for now we're just generating them on the fly
    fetch('/api/rooms/' + this.props.params.roomId, { credentials: 'same-origin' })
      .then(res => res.json())
      .then(json => json.messages)
      .then(messages => this.setState({messages: messages}) )
  }

  sendMessage(data) {
    const message = {
      content: data.newMessage,
      room: this.props.params.roomId
    }
    socket.emit('client:message', message)
  }

  renderMessages() {
    // you should actually have an indication of
    // the messages are an empty array
    const result = this.state.messages.map((message, i) => {
      return(
        <Message content = { message.content }
                 time = { message.time }
                 avatar = { i }
                 key = { message.room + i }
                 from = { message.from } />
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
        <Formsy.Form onValidSubmit = { this.sendMessage }>
          <FormsyText name = "newMessage"
                      validations = "isWords"
                      required
                      hintText = "Enter a message"
                      style = { { width: '100%' } }/>
        </Formsy.Form>
      </div>
    )
  }
}
