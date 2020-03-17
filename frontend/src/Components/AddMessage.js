import React, { Component } from 'react'
import { Button, Form, Container, Col, Row } from 'react-bootstrap'
import { geolocated } from 'react-geolocated';
import moment from 'moment'

import './addMessage.css'

class addMessage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lat: "",
            lon: "",
            error: ""
        }
    }

    logout = () => {
        this.props.logout()
    }

    add = async (event) => {
        event.preventDefault()

        if (this.message.value === "") {
            this.setState({ error: "Inserire il messaggio!" })
            return
        }

        await this.setState({ lat: this.props.coords.latitude })
        await this.setState({ lon: this.props.coords.longitude })
        await this.setState({ error: "" })

        let date = moment().format('DD-MM-YYYY HH:mm')

        fetch("http://localhost:8080/messages", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.props.token,
            },
            body: JSON.stringify({ username: this.props.username, content: this.message.value, lat: this.state.lat, lon: this.state.lon, date: date })
        }).then((res) => res.json())

        this.setState({ error: "Messaggio inserito corretamente!" })

        this.message.value = ""
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col s={11} md={11} lg={11} ><h2 className="title" >Add a messagge to GuestMap</h2></Col>
                        <Col s={1} md={1} lg={1}> <Button variant="light" type="submit" className="btn btn-outline-dark logout" onClick={this.logout} >Logout</Button></Col>
                    </Row>
                </Container>
                <h4 className="head" >Bentornato {this.props.username}!</h4>
                <h6 className="error">{this.state.error}</h6>
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
            </div>
        )
    }
}

export default geolocated()(addMessage);