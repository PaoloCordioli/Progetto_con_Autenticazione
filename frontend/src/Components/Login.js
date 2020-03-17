import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import './Login.css'

export default class login extends Component {

    signIn = (event) => {
        this.props.signIn(this.username.value, this.password.value, event)

        this.username.value = ''
        this.password.value = ''
    }

    render() {
        return (
            <div>
                <h2 className="title">Sign in to add a message</h2>
                <h5 className="error">{this.props.error}</h5>
                <Form className="form" onSubmit={this.signIn}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" ref={(text) => { this.username = text }} />
                        <Form.Text className="text-muted">
                            We'll never share your username with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={(text) => { this.password = text }} />
                        <Form.Text className="text-muted">
                            We'll never share your password with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="light" type="submit" className="btn btn-outline-dark">
                        Sign In
                    </Button>
                </Form>
            </div>
        )
    }
}