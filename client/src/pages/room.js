// React
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

// additional components
import Message from './message'

// Material UI
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
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
      this.setState({
        messages: this.state.messages.concat(message)
      })

      window.scrollTo(0,document.body.scrollHeight)
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
    fetch('/api/rooms/' + this.props.params.roomId, { credentials: 'same-origin' })
      .then(res => res.json())
      .then(messages => this.setState({messages: messages}) )
  }

  sendMessage(data) {
    const message = {
      content: data.newMessage,
      room: this.props.params.roomId
    }
    socket.emit('client:message', message)
    this.refs.form.resetValue()
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

    const titleText = (
      <span>
        This is a room for <b>{ this.props.params.roomId }</b>
      </span>
    )

    return(
      <div>
        <List>
          <ListItem
            primaryText = { titleText }/>
          <Divider />
          { this.renderMessages() }
        </List>
        <Formsy.Form onValidSubmit = { this.sendMessage }>
          <FormsyText name = "newMessage"
                      required
                      hintText = "Enter a message"
                      ref = "form"
                      style = { { width: '100%' } }/>
        </Formsy.Form>
      </div>
    )
  }
}
