// React
import React from 'react'
import { render } from 'react-dom'
import 'whatwg-fetch'

// Material UI
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import AccountIcon from 'material-ui/svg-icons/action/account-circle'
import CircularProgress from 'material-ui/CircularProgress'

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
      <div className = 'pure-g pure-u-md-1-3'>
        <Card>
          <CardMedia overlay = { personalInfo } >
            <img src = { this.state.profile.background } />
          </CardMedia>
          <CardTitle subtitle="About Me" />
          <CardText>
            { this.state.profile.mantra }
          </CardText>
        </Card>
      </div>
    )
  }

  render() {
    const style = {
      marginLeft: '50%',
      top: '64px'
    }

    return this.state.rendered ? (
      this.renderAccount()
    ) : (
      <CircularProgress style = { style }/>
    )
  }
}
