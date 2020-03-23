import React, { useState, useRef } from 'react';
import Menu from './Menu'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import './SignIn.css'


function SignIn() {

    let history = useHistory()

    const username = useRef("")
    const password = useRef("")
    const [error, setError] = useState("")

    const signIn = async (event) => {
        event.preventDefault()

        if (username.current.value === "" || password.current.value === "") {
            setError("Inserisci tutti i campi!")
            return
        }

        let response = await fetch("http://localhost:8000/users/" + username.current.value, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password.current.value})
        }).then((res) => res.json())

        if (response.ok === true) {
            localStorage.setItem('sign',true)
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('username', username.current.value)
            history.push('')
        }
        else setError("Password o username errati!")
    }

    return (
        <div>
            <Menu />
            <h2 className="title">Sign in to add a message</h2>
            <h6 className="error">{error}</h6>
            <Form className="form" onSubmit={signIn}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" ref={username} />
                    <Form.Text className="text-muted">
                        We'll never share your username with anyone else.
                        </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={password} />
                    <Form.Text className="text-muted">
                        We'll never share your password with anyone else.
                        </Form.Text>
                </Form.Group>
                <Button variant="light" type="submit" className="btn btn-outline-dark">
                    Sign In
                    </Button>
            </Form>
        </div>
    );
}


export default SignIn