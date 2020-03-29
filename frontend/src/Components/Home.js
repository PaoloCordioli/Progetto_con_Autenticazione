import React, { useState, useEffect } from 'react';
import { Map, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { Button } from 'react-bootstrap'
import Control from 'react-leaflet-control';
import Messages from './Messages'
import Menu from './Menu'
import './Home.css'

function Home() {
    const login = (localStorage.getItem('sign') === "true")

    const [messages, setMessages] = useState([])
    const [button, setbutton] = useState("I miei messaggi")

    useEffect(() => {
        fetch('https://message.paolocordioli.repl.co/messages').then(r => r.json()).then(obj => setMessages(obj))
    }, []);

    const seeMyMessage = async () => {
        if (button === "Tutti i messaggi") {

            setbutton("I miei messaggi")

            let result = await fetch('https://message.paolocordioli.repl.co/messages').then(r => r.json())
            setMessages(result)
            return
        }
        
        const token = localStorage.getItem("token")
        const username = localStorage.getItem("username")

        let result = await fetch('https://message.paolocordioli.repl.co/messages/' + username, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
            }
        }).then(r => r.json())

        setMessages(result)
        setbutton("Tutti i messaggi")
    }

    if (login) {
        return (
            <div>
                <Menu />
                <div>
                    <h2 className="title"> The GuestMap </h2>
                    <Map center={[45.51, 10.2]} zoom={3} maxZoom={18}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MarkerClusterGroup maxClusterRadius={50}>
                            <Messages messages={messages} />
                        </MarkerClusterGroup>
                        <Control position="bottomright">
                            <Button onClick={seeMyMessage} className="btn btn-outline-dark btn-light">{button}</Button>
                        </Control>
                    </Map>

                </div>
            </div>
        );
    }

    return (
        <div>
            <Menu />
            <div>
                <h2 className="title"> The GuestMap </h2>
                <Map center={[45.51, 10.2]} zoom={3} maxZoom={18}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MarkerClusterGroup maxClusterRadius={50}>
                        <Messages messages={messages} />
                    </MarkerClusterGroup>
                </Map>

            </div>
        </div>
    );
}


export default Home