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

  fetchSearchResults(data) {
    console.log(data.query)
    this.setState({ searching: 1 })

    // simulating searching
    setTimeout(() => this.setState({ searching: 2 }), 5000)
  }

  render() {
    return(
      <div>
        <Formsy.Form onValidSubmit = { this.fetchSearchResults }>
          <FormsyText name = "query"
                      required
                      hintText = "Enter a message"
                      ref = "form"
                      style = { { width: '50%' } }/>
        </Formsy.Form>
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
