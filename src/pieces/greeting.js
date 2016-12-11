import React from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import Chip from 'material-ui/Chip'

export default class Greeting extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: true,
            alert: false
        }
    }

    renderChip() {
      return this.state.alert ? (
        <Chip onRequestDelete = { () => this.setState({alert: false}) }>
          Login is not currently implemented
        </Chip>
      ) : ''
    }

    render() {
        const actions = [
            <RaisedButton
                label = "Login"
                primary = { true }
                onTouchTap = { () => { this.setState({alert: true}) } } >

            </RaisedButton>
        ]

        return (
            <div>
                <Dialog title = "Welcome to the chatroom!"
                        modal = { true }
                        open = { this.state.open }
                        actions = { actions }>
                        Please press the button to continue { this.renderChip() }
                </Dialog>
            </div>
        )
    }
}
