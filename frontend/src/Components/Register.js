import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import './Register.css'

export default class register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: ""
        }
    }

    signUp = async (event) => {
        event.preventDefault()
        if (this.username.value === "" || this.password.value === "" || this.repassword.value === "") {
            this.setState({ message: <h6 className="message">Inserire tutti i campi!</h6> })
            return
        }
        if (this.password.value !== this.repassword.value) {
            this.setState({ message: <h6 className="message">Password non uguali!</h6> })
            return
        }
        
        let result  = await fetch("http://localhost:5000/users", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username : this.username.value, password : this.password.value })
        }).then((res) => res.json())

        if (result.ok === false){
            this.setState({ message: <h6 className="message">Username esistente, prova a cambiarlo!</h6> })
            return
        }
        
        this.setState({ message: <h6 className="message">Registrazione avvenuta con successo!</h6> })

        this.username.value = "" 
        this.password.value = "" 
        this.repassword.value = ""

    }

    render() {
        return (
            <div>
                <h2 className="title">Sign up to add a message</h2>
                {this.state.message}
                <Form className="form" onSubmit={this.signUp}>
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
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={(text) => { this.repassword = text }} />
                        <Form.Text className="text-muted">
                            We'll never share your password with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="light" type="submit" className="btn btn-outline-dark">
                        Sign Up
                    </Button>
                </Form>
            </div>
        )
    }
}
