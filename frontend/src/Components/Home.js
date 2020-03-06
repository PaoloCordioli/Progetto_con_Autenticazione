import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import Messages from './Messages'
import './Home.css'

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           messages : [] // array di messaggi
        };
     }

    componentWillMount = async () => {
        let obj = await fetch('http://localhost:5000/messages').then(r => r.json())
        this.setState({messages : obj})
    }

    render() {
        const position = [45.51, 10.2]
        return (
            <div>
                <h2 className="title"> The GuestMap </h2>
                <Map center={position} zoom={5}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Messages messages={this.state.messages} />
                </Map>
            </div>
        )
    }
}