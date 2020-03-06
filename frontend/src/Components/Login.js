import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import './Login.css'

export default class login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            token: ''
        }
        this.signIn = this.signIn.bind(this)
    }

    signIn = async (e) => {
        if (this.username.value !== '' && this.password.value !== '') {
            e.preventDefault()
            let response = await fetch("http://localhost:5000/users/" + this.username.value, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: this.password.value })
            }).then((res) => res.json())

            this.setState({ token: response.token })
            this.username.value = ''
            this.password.value = ''

            let history = useHistory();
            history.push('/addMessage');
        }
    }

    render() {
        return (
            <div>
                <h2 className="title">Sign in to add a message</h2>
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
                    </Form.Group>
                    <Button variant="light" type="submit" className="btn btn-outline-dark">
                        Sign
                    </Button>
                </Form>
            </div>
        )
    }
}

