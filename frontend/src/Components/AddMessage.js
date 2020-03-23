import React, { useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap'
import { geolocated } from 'react-geolocated';
import moment from 'moment'
import Menu from './Menu'
import './AddMessage.css'

function Message(props) {

    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    const date = moment().format('DD-MM-YYYY HH:mm')

    const [error, setError] = useState("")
    const message = useRef("")

    const add = async (event) => {
        event.preventDefault()

        if (message.current.value === "") {
            setError("Inserisci il messaggio!")
            return
        }

        fetch("http://localhost:8080/messages", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify({ username: username, content: message.current.value, lat: props.coords.latitude, lon: props.coords.longitude, date: date })
        }).then((res) => res.json())

        setError("Messaggio inserito corretamente!")

        message.current.value = ""
    }

    return (
        <div>
            <Menu />
            <h2 className="title" > Add a messagge to GuestMap</h2>
            <h4 className="head" > Bentornato {username}!</h4>
            <h6 className="error">{error}</h6>
            <Form className="form" onSubmit={add}>
                <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control type="text" placeholder="Enter message" ref={message} />
                </Form.Group>
                <Button variant="light" type="submit" className="btn btn-outline-dark">
                    Add
                </Button>
            </Form>
        </div>
    );
}


export default geolocated()(Message);