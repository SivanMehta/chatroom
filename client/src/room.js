// React
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

// custom components
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
  }

  componentWillReceiveProps() {
    // in the future, this will fetch messages from the server,
    // but for now we're just generating them on the fly
    fetch('/api/rooms/' + this.props.params.roomId, { credentials: 'same-origin' })
      .then(res => res.json())
      .then(json => json.messages)
      .then(messages => this.setState({messages: messages}) )
  }

  sendMessage(data) {
    console.log(data)
  }

  renderMessages() {
    // you should actually have an indication of
    // the messages are an empty array
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
