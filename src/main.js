// React
import React from 'react'
import { render } from 'react-dom'

// Material UI needs
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
injectTapEventPlugin()

// Custom Components
import Greeting from './pieces/greeting'

// Routing
import { Router, Route, hashHistory } from 'react-router'

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  renderBody() {
    return (
      <div>
        <Greeting />
        { this.props.children }
      </div>
    )
  }

  render() {
    return(
      <MuiThemeProvider>
        { this.renderBody() }
      </MuiThemeProvider>
    )
  }
}

class Otherwise extends React.Component {
  constructor(props) { super(props) }
  render() { return( <span>nothing else</span> ) }
}

render((
  <Router history = { hashHistory }>
    <Route path="/" component = { Main }>
      <Route path="/chatroom" component = { Otherwise }/>
    </Route>
  </Router>
), document.getElementById('app'))
