// React
import React from 'react'
import { render } from 'react-dom'
import 'whatwg-fetch'

// Icons
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
    // fetch('/api/profiles', { credentials: 'same-origin' })
    //   .then(res => res.json)
    //   .then(res => console.log(res))
  }

  render() {
    return this.state.rendered ? (
      <AccountIcon />
    ) : (
      <RenewIcon />
    )
  }
}
