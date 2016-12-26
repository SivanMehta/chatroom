// React
import React from 'react'
import { render } from 'react-dom'
import 'whatwg-fetch'

// Material UI
import CircularProgress from 'material-ui/CircularProgress'
import { List, ListItem } from 'material-ui/List'

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query : "asuh dude"
    }
  }

  render() {
    return(
      <div>
        Search for stuff!
      </div>
    )
  }
}
