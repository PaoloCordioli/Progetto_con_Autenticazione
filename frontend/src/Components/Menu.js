import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import '../App.css'


function Menu() {

    const login = (localStorage.getItem('sign') === "true")

    let history = useHistory()

    const singOut = () => {
        localStorage.setItem('sign', false)
        localStorage.setItem('token',"")
        localStorage.setItem('username', "")
        history.push('/login')
    }

    if (login) {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                        <Nav.Link as={Link} to="/new_message">New Message</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={singOut} >Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">SignUp</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}


export default Menu