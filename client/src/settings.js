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
import TextField from 'material-ui/TextField'
import Visibility from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'

// save button specific imports
import SaveIcon from 'material-ui/svg-icons/content/save'
import CheckCircle from 'material-ui/svg-icons/action/check-circle'
import { green900 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rendered: false,
      persisting: 0
    }

    this.saveSettings = this.saveSettings.bind(this)

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

  saveSettings() {
    this.setState({ persisting: 1 })

    // simulating persisting to the server
    setTimeout(() => this.setState({ persisting: 2 }), 5000)
  }

  renderIcon() {
    switch (this.state.persisting) {
        case 0:
          return <SaveIcon color = { green900 } />
        case 1:
          return <CircularProgress size = { 24 } color = { green900 } />
        case 2:
          return <CheckCircle color = { green900 } />
      }
  }

  renderSettings() {
    const style = {
      marginLeft: '33.33%'
    }

    return(
      <div style = { style }>
        <p>
          <Checkbox
            label = "Autocomplete"
            defaultChecked = { this.state.autocomplete }
            onCheck = {(e, v) => this.setState({autocomplete: v})}
          />
        </p>
        <p>
          <SelectField
            value = {this.state.language}
            onChange = {(e, i, v) => this.setState({language: v})}
            floatingLabelText="Select a Language" >
              <MenuItem key = {'English'} value = {'English'} primaryText = "English" />
              <MenuItem key = {'Nerd'} value = {'Nerd'} primaryText = "Nerd" />
              <MenuItem key = {'Klingon'} value = {'Klingon'} primaryText = "Klingon" />
          </SelectField>
        </p>
        <p>
          <TextField
            defaultValue = { this.state.email }
            floatingLabelText = "Email"
            onChange = { (e) => this.setState({email: e.target.value})}
          />
      </p>
        <p>
          <Checkbox
            checkedIcon = { <Visibility /> }
            uncheckedIcon = { <VisibilityOff /> }
            defaultChecked = { this.state.status }
            label  =  { (this.state.status ? 'On': 'Off') + 'line'}
            onCheck = { (e, v) => this.setState({status: v}) }
          />
      </p>
        <p>
          <RaisedButton
            label = "Submit"
            labelPosition = "before"
            backgroundColor = "#C5E1A5"
            hoverColor = "#C5E1A5"
            icon = { this.renderIcon() }
            onTouchTap = { this.saveSettings }/>
        </p>
        <p>
          { JSON.stringify(this.state) }
        </p>
      </div>
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
