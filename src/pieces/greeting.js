import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class Greeting extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            open: true
        }
    }

    render() {
        return (
            <div>
                <Dialog title = "Welcome to our Chatroom!"
                        modal = { true }
                        open = { this.state.open }>
                        Please select an action to continue!
                </Dialog>
            </div>
        )
    }
}