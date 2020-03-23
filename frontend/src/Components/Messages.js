import React, { Component } from 'react'
import { Marker, Popup } from 'react-leaflet'

export default class Message extends Component {

    createMarker = (mes) => { // funzione che permette di creare un marker con un messaggio per ogni messaggio nello state
        return <Marker onMouseOver={(e) => { e.target.openPopup(); }}
            onMouseOut={(e) => { e.target.closePopup(); }}
            key={Math.random()} position={[mes.lat, mes.lon]}><Popup><strong>{mes.content}</strong> <br></br> - {mes.username.charAt(0).toUpperCase() + mes.username.slice(1)}, {mes.date}</Popup></Marker>
    }

    render() {
        let messages = this.props.messages.map(this.createMarker)
        return (
            <div>
                {messages}
            </div>
        )
    }
}