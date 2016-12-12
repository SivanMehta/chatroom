// React
import React from 'react'
import { render } from 'react-dom'

// Material UI needs
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
injectTapEventPlugin()

// Custom Components
import Greeting from './pieces/greeting'


export default class Main extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <MuiThemeProvider>
        <Greeting />
      </MuiThemeProvider>
    )
  }
}

render(<Main />, document.getElementById('app'))
