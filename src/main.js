// React
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'; injectTapEventPlugin()
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import MenuButton from 'material-ui/svg-icons/navigation/menu'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'


class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      logged: false
    }
  }

  render() {
    return(
      <MuiThemeProvider>
        <AppBar
            title="chatroom"
            iconElementLeft={ <Nav /> }
          />
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
  }

  renderRooms() {
    // in the future, this would return some recommended rooms, but for now we can hard code them
    return [
      <MenuItem primaryText = "John" />,
      <MenuItem primaryText = "Paul" />,
      <MenuItem primaryText = "George" />,
      <MenuItem primaryText = "Ringo" />
    ]
  }

  render() {
    return (
      <div>
        <IconButton onTouchTap = { () => this.setState({open: true}) }>
          <MenuButton/>
        </IconButton>
        <Popover
          open = { this.state.open }
          onRequestClose = { () => this.setState({open: false}) } >
          <Menu>
            <MenuItem primaryText = "Profile" />
            <MenuItem primaryText = "Settings" />
            <MenuItem primaryText = "Rooms"
                      menuItems = { this.renderRooms() }
                      rightIcon = {<ArrowDropRight />}/>
            <Divider />
            <MenuItem primaryText="Logout" />
          </Menu>
        </Popover>
      </div>
    )
  }
}

render((
  <Router history = { hashHistory }>
    <Route path="/" component = { Main }>
    </Route>
  </Router>
), document.getElementById('app'))
