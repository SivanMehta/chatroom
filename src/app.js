import React from 'react'
import { render } from 'react-dom'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    // set up inital application
  }

  render() {
    return (
      <span>Asuh dude</span>
    )
  }
}

render(<App />, document.getElementById('app'));
