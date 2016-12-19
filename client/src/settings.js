// React
import React from 'react'
import { render } from 'react-dom'
import 'whatwg-fetch'

// Material UI
import CircularProgress from 'material-ui/CircularProgress'
import { List, ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rendered: false
    }
  }

  componentDidMount() {
    fetch('/api/settings', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(settings => this.setState({
        rendered: true,
        autocomplete: settings.autocomplete,
        language: settings.language,
        email: settings.email,
        status: settings.status
      }))
  }

  renderSettings() {
    return(
      <List>
        <ListItem>
          <Checkbox
            label = "Autocomplete"
            defaultChecked = { this.state.autocomplete }
            onCheck = {(e, v) => this.setState({autocomplete: v})}
          />
        </ListItem>
        <ListItem>
          <SelectField
            value = {this.state.language}
            onChange = {(e, i, v) => this.setState({language: v})}
            floatingLabelText="Select a Language" >
              <MenuItem key = {'English'} value = {'English'} primaryText = "English" />
              <MenuItem key = {'Nerd'} value = {'Nerd'} primaryText = "Nerd" />
              <MenuItem key = {'Klingon'} value = {'Klingon'} primaryText = "Klingon" />
          </SelectField>
        </ListItem>
        <ListItem>
          { JSON.stringify(this.state) }
        </ListItem>
      </List>
    )
  }

  render() {
    const style = {
      marginLeft: '50%',
      top: '64px'
    }

    return this.state.rendered ? (
      this.renderSettings()
    ) : (
      <CircularProgress style = { style }/>
    )
  }
}
