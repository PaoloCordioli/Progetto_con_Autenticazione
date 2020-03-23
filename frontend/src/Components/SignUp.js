import React, { useState, useRef } from 'react';
import Menu from './Menu'
import { Form, Button } from 'react-bootstrap'
import './SignUp.css'

function SignUp() {

    const username = useRef("")
    const password = useRef("")
    const rePassword = useRef("")
    const [error, setError] = useState("")

    const signUp = async (event) => {
        event.preventDefault()

        if (username.current.value === "" || password.current.value === "" || rePassword.current.value === "") {
            setError("Inserire tutti i campi!")
            return
        }
        if (password.current.value !== rePassword.current.value) {
            setError("Password non uguali!")
            return
        }

        let result = await fetch("http://localhost:8000/users", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username.current.value, password: password.current.value })
        }).then((res) => res.json())

        if (result.ok === false) {
            setError("Username esistente, prova a cambiarlo!")
            return
        }

        setError("Registrazione avvenuta con successo!")

        username.current.value = ""
        password.current.value = ""
        rePassword.current.value = ""
    }

    return (
        <div>
            <Menu />
            <h2 className="title">Sign up to add a message</h2>
            <h6 className="error">{error}</h6>
            <Form className="form" onSubmit={signUp}>
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
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={rePassword} />
                    <Form.Text className="text-muted">
                        We'll never share your password with anyone else.
                        </Form.Text>
                </Form.Group>
                <Button variant="light" type="submit" className="btn btn-outline-dark">
                    Sign Up
                </Button>
            </Form>
        </div>
    );
}


export default SignUp