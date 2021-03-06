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
import DoneIcon from 'material-ui/svg-icons/action/done'
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
      .then(settings => this.setState(Object.assign(settings, {
        rendered: true
      })))
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
          return <DoneIcon color = { green900 } />
      }
  }

  renderSettings() {
    const style = {
      marginLeft: '33.33%'
    }

    return(
      <div style = { style }>
        <div>
          <Checkbox
            label = "Autocomplete"
            defaultChecked = { this.state.autocomplete }
            onCheck = {(e, v) => this.setState({autocomplete: v})}
          />
        </div>
        <div>
          <SelectField
            value = {this.state.language}
            onChange = {(e, i, v) => this.setState({language: v})}
            floatingLabelText="Select a Language" >
              <MenuItem key = {'English'} value = {'English'} primaryText = "English" />
              <MenuItem key = {'Nerd'} value = {'Nerd'} primaryText = "Nerd" />
              <MenuItem key = {'Klingon'} value = {'Klingon'} primaryText = "Klingon" />
          </SelectField>
        </div>
        <div>
          <Checkbox
            checkedIcon = { <Visibility /> }
            uncheckedIcon = { <VisibilityOff /> }
            defaultChecked = { this.state.status }
            label  =  { (this.state.status ? 'On': 'Off') + 'line'}
            onCheck = { (e, v) => this.setState({status: v}) }
          />
        </div>
        <div>
          <RaisedButton
            label = "Submit"
            labelPosition = "before"
            backgroundColor = "#C5E1A5"
            icon = { this.renderIcon() }
            onTouchTap = { this.saveSettings }/>
        </div>
        <div>
          { JSON.stringify(this.state) }
        </div>
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
