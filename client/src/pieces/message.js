import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import moment from 'moment'

export default class Message extends React.Component {
  constructor() {
    super()
  }

  render() {
    const formattedTime = moment(this.props.time)
                            .format("h:mma MMM Do")
    return(
      <ListItem primaryText = { this.props.content }
                secondaryText = { this.props.from + " @ " + formattedTime }
                leftAvatar = {<Avatar src={'images/avatar' + (this.props.avatar % 4) + '.jpg'} />} />
    )
  }
}
