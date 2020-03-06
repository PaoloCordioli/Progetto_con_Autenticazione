import React, { Component } from 'react'
import { Marker, Popup } from 'react-leaflet'

export default class Message extends Component {

    createMarker = (mes) => { // funzione che permette di creare un marker con un messaggio per ogni messaggio nello state
        return <Marker onMouseOver={(e) => { e.target.openPopup(); }}
            onMouseOut={(e) => { e.target.closePopup(); }}
            key={mes.id} position={[mes.lat, mes.lon]}><Popup><strong>{mes.content}</strong></Popup></Marker>
    }

    /*createListMessages = () => { // funzione che crea la lista di messaggi e marker
        if (this.props.message === []) {
            return <div></div>
        } else {
            return this.props.message.map(this.createMarker)
        }
    }*/

    render() {
        let messages = this.props.messages.map(this.createMarker)
        return (
            <div>
                {messages}
            </div>
        )
    }
}