// React
import React from 'react'
import { render } from 'react-dom'
import 'whatwg-fetch'

// Material UI
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import AccountIcon from 'material-ui/svg-icons/action/account-circle'
import RenewIcon from 'material-ui/svg-icons/action/autorenew'

export default class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rendered: false
    }
  }

  componentDidMount() {
    fetch('/api/profiles', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(profile => this.setState({
        rendered: true,
        profile: profile
      }))
  }

  renderAccount() {
    const personalInfo = <CardHeader title = { this.state.profile.email }
                                    subtitle = { this.state.profile.motto }
                                    avatar = { this.state.profile.avatar } />

    return(
      <Card>
        <CardMedia overlay = { personalInfo } >
          <img src = { this.state.profile.background } />
        </CardMedia>
        <CardTitle subtitle="About Me" />
        <CardText>
          { this.state.profile.mantra }
        </CardText>
      </Card>
    )
  }

  render() {
    return this.state.rendered ? (
      this.renderAccount()
    ) : (
      <RenewIcon />
    )
  }
}
