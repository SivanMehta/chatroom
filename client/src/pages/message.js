import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

export default class Message extends React.Component {
  constructor() {
    super()
  }

  render() {
    return(
      <ListItem primaryText = { this.props.content }
                secondaryText = { this.props.from + " @ " + this.props.time }
                leftAvatar = {<Avatar src={'images/avatar' + (this.props.avatar % 4) + '.jpg'} />} />
    )
  }
}
