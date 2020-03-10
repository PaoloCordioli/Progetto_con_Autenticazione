import React, { Component } from 'react'
import { Button, Form, Container, Col, Row } from 'react-bootstrap'
import { geolocated } from 'react-geolocated';

import './addMessage.css'

class addMessage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: "''",
            lat: "",
            lon: "",
            error: "",
            username: ""
        }
    }

    logout = () => {
        this.props.logout()
    }

    add = async (event) => {
        event.preventDefault()
        if (this.message.value === "") {
            this.setState({ error: <h5 className="error">Inserire il messaggio!</h5> })
            return
        }

        await this.setState({ username : this.props.username})
        await this.setState({ message: this.message.value })
        await this.setState({ lat : this.props.coords.latitude })
        await this.setState({ lon : this.props.coords.longitude })
        await this.setState({ error: "" })

        fetch("http://localhost:5000/messages", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username : this.state.username, content : this.state.message, lat : this.state.lat, lon : this.state.lon})
        }).then((res) => res.json())
    }

    render() {
        return (
            <div>
                <h2 className="title">Add a messagge to GuestMap</h2>
                {this.state.error}
                <Form className="form" onSubmit={this.add}>
                    <Form.Group>
                        <Form.Label>Message</Form.Label>
                        <Form.Control type="text" placeholder="Enter message" ref={(text) => { this.message = text }} />
                    </Form.Group>
                    <Button variant="light" type="submit" className="btn btn-outline-dark">
                        Add
                    </Button>
                </Form>
                <br></br>
                <Container>
                    <Row>
                        <Col s={11} md={11} lg={11} ></Col>
                        <Col s={1} md={1} lg={1}> <Button variant="light" type="submit" className="btn btn-outline-dark" onClick={this.logout} >Logout</Button></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default geolocated()(addMessage);