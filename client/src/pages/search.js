// React
import React from 'react'
import { render } from 'react-dom'
import 'whatwg-fetch'

// Material UI
import CircularProgress from 'material-ui/CircularProgress'
import { List, ListItem } from 'material-ui/List'
import TextField from 'material-ui/TextField'

// persist button
import SearchIcon from 'material-ui/svg-icons/action/search'
import DoneIcon from 'material-ui/svg-icons/action/done'
import { green900 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query : '',
      searching: 0
    }

    this.fetchSearchResults = this.fetchSearchResults.bind(this)
  }

  renderIcon() {
    switch (this.state.searching) {
        case 0:
          return <SearchIcon color = { green900 } />
        case 1:
          return <CircularProgress size = { 24 } color = { green900 } />
        case 2:
          return <DoneIcon color = { green900 } />
      }
  }

  fetchSearchResults() {
    this.setState({ searching: 1 })

    // simulating searching
    setTimeout(() => this.setState({ searching: 2 }), 5000)
  }

  render() {
    return(
      <div>
        <TextField
          id = 'query'
          hintText = 'Search for Messages'
          value = { this.state.query }
          onChange={ event => this.setState({ query: event.target.value}) }
          fullWidth = { true }/>
        <br />
        <RaisedButton
          label = "Submit"
          labelPosition = "before"
          backgroundColor = "#C5E1A5"
          icon = { this.renderIcon() }
          onTouchTap = { this.fetchSearchResults }/>
      </div>
    )
  }
}
