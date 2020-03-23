import React from 'react'
import { Marker, Popup } from 'react-leaflet'

function Message(props) {

    const createMarker = (mes) => {
        return <Marker onMouseOver={(e) => { e.target.openPopup(); }}
            onMouseOut={(e) => { e.target.closePopup(); }}
            key={Math.random()} position={[mes.lat, mes.lon]}><Popup><strong>{mes.content}</strong> <br></br> - {mes.username.charAt(0).toUpperCase() + mes.username.slice(1)}, {mes.date}</Popup></Marker>
    }

    let messages = props.messages.map(createMarker)

    return (
        <div>
            {messages}
        </div>
    )

}

export default Message