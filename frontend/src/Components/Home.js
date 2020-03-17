import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import { Button } from 'react-bootstrap'
import Messages from './Messages'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Control from 'react-leaflet-control';

import './Home.css'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [], // array di messaggi
            button: "I miei messaggi", // text del bottone
            error: "" // errore da visualizzare
        };
    }

    componentWillMount = async () => {
        let obj = await fetch('http://localhost:8080/messages').then(r => r.json())
        this.setState({ messages: obj })
    }

    seeMyMessage = async () => {
        const username = localStorage.getItem("username")
        
        if (!username) {
            this.setState({ error: "Devi essere loggato !!" })
            return
        }

        this.setState({ error: "" })

        if (this.state.button === "Tutti i messaggi") {

            this.setState({ button: "I miei messaggi" })

            let result = await fetch('http://localhost:8080/messages').then(r => r.json())
            this.setState({ messages: result })

            return
        }
        const token = localStorage.getItem("token")

        let result = await fetch('http://localhost:8080/messages/' + username, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
            }
        }).then(r => r.json())

        this.setState({ messages: result })
        this.setState({ button: "Tutti i messaggi" })
    }

    render() {
        const position = [45.51, 10.2]
        return (
            <div>
                <h2 className="title"> The GuestMap </h2>
                <Map center={position} zoom={3} maxZoom={18}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MarkerClusterGroup maxClusterRadius={50}>
                        <Messages messages={this.state.messages} />
                    </MarkerClusterGroup>
                    <Control position="bottomright">
                        <h6>{this.state.error}</h6>
                        <Button onClick={this.seeMyMessage} className="btn btn-outline-dark btn-light">{this.state.button}</Button>
                    </Control>
                </Map>
            </div>
        )
    }
}