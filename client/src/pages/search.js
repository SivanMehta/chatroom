// React
import React from 'react'
import { render } from 'react-dom'
import 'whatwg-fetch'

// Material UI
import CircularProgress from 'material-ui/CircularProgress'
import { List, ListItem } from 'material-ui/List'
import Formsy from 'formsy-react'
import FormsyText from 'formsy-material-ui/lib/FormsyText'

// persist button
import SearchIcon from 'material-ui/svg-icons/action/search'
import DoneIcon from 'material-ui/svg-icons/action/done'
import { green900 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'

// messages
import 'whatwg-fetch'
import Message from './message'
import { Link } from 'react-router'

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query : '',
      searching : 0,
      results : []
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

  fetchSearchResults(data) {
    this.setState({ searching: 1 })

    fetch('/api/search?q=' + data.query, {credentials: 'same-origin'})
      .then(res => res.json())
      .then(results => this.setState({ results: results }))
      .then(() => this.setState({ searching: 2 }))
  }

  renderMessages() {
    // you should actually have an indication of
    // the messages are an empty array
    const result = this.state.results.map((message, i) => {
      return(
        <Link to = { '/room/' + message.room }
          key = { i }
          style={{ textDecoration: 'none' }}>
          <Message content = { message.content }
            time = { message.time }
            avatar = { i }
            key = { message.room + i }
            from = { message.from } />
        </Link>
      )
    })
    return result
  }

  render() {
    return(
      <div className = 'pure-g'>
        <div className = "pure-u-md-1-3">
          <Formsy.Form onValidSubmit = { this.fetchSearchResults }>
            <FormsyText name = "query"
              required
              hintText = "Enter a message"
              ref = "form"
              style = { { width: '100%' } }/>
          </Formsy.Form>
          <RaisedButton
            label = "Submit"
            labelPosition = "before"
            backgroundColor = "#C5E1A5"
            icon = { this.renderIcon() }
            onTouchTap = { this.fetchSearchResults }/>
        </div>
        <div className = 'pure-u-md-2-3'>
          { this.renderMessages() }
        </div>
      </div>
    )
  }
}
