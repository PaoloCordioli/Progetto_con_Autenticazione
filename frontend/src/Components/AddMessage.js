import React, { Component } from 'react'
import { Button, Form, Container, Col, Row } from 'react-bootstrap'
import { geolocated } from 'react-geolocated';

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
            this.setState({ error: <h6 className="error">Inserire il messaggio!</h6> })
            return
        }
        await this.setState({ lat: this.props.coords.latitude })
        await this.setState({ lon: this.props.coords.longitude })
        await this.setState({ error: "" })

        fetch("http://localhost:5000/messages", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token' : this.props.token,
            },
            body: JSON.stringify({ username: this.props.username, content: this.message.value, lat: this.state.lat, lon: this.state.lon })
        }).then((res) => res.json())

        this.setState({error : <h6 className="error">Messaggio inserito corretamente!</h6> })
        
        this.message.value = ""
    }

    render() {
        return (
            <div>
                <h2 className="title" >Add a messagge to GuestMap</h2>
                <h4 className="head" >Berntornato {this.props.username}!</h4>
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