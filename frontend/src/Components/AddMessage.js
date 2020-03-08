import React, { Component } from 'react'
import {Button} from 'react-bootstrap'

export default class addMessage extends Component {

    logout = () => {
        this.props.logout()
    }

    render() {
        return (
            <div>
                <Button variant="light" type="submit" className="btn btn-outline-dark" onClick={this.logout}>
                    Logout
                </Button>
            </div>
        )
    }
}