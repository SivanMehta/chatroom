// React
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'; injectTapEventPlugin()
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Drawer from 'material-ui/Drawer'
import Popover from 'material-ui/Popover'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

// icons
import MenuButton from 'material-ui/svg-icons/navigation/menu'
import ChatIcon from 'material-ui/svg-icons/communication/chat'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app'
import AccountIcon from 'material-ui/svg-icons/action/account-circle'

// custom components
import Room from './room'
import io from 'socket.io-client'
let socket = io()

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      logged: false
    }
  }

  render() {
    return(
      <MuiThemeProvider>
        <div>
          <AppBar
            title="chatroom"
            iconElementLeft={ <Nav /> }
            />
          { this.props.children }
        </div>
      </MuiThemeProvider>
    )
  }
}

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }

    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
  }

  close() { this.setState({open: false}) }
  open() { this.setState({open: true}) }

  rooms() {
    // in the future, this would return some recommended rooms, but for now we can hard code them
    const rooms = ['John', 'Paul', 'George', 'Ringo']
    const result = rooms.map((room, i) => {
      return(
        <ListItem
          key = { i }
          primaryText = { room }
          containerElement={ <Link to={ "/room/" + room }/> }
          onTouchTap = { this.close }/>
      )
    })

    return result
  }

  render() {
    return (
      <div>
        <IconButton onTouchTap = { this.open }>
          <MenuButton/>
        </IconButton>
        <Drawer
          docked = { false }
          open = { this.state.open }
          onRequestChange = { this.close } >
            <List>
              <ListItem primaryText = "Profile" rightIcon = { <AccountIcon /> }/>
              <ListItem primaryText = "Settings" rightIcon = { <SettingsIcon /> }/>
              <ListItem primaryText = "Rooms"
                        rightIcon = { <ChatIcon /> }
                        nestedItems = { this.rooms() }
                        primaryTogglesNestedList = { true }
                        initiallyOpen = { false } />
              <Divider />
              <ListItem primaryText = "Log out"
                rightIcon = { <ExitIcon /> }
                href = "/logout" />
            </List>
        </Drawer>
      </div>
    )
  }
}

render((
  <Router history = { hashHistory }>
    <Route path = "/" component = { Main }>
      <Route path = "profile" component = { Main } />
      <Route path = "settings" component = { Main } />
      <Route path = "room">
        <Route path = "/room/:roomId" component = { Room }/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))
