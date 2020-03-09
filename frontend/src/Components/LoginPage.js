import React, { Component } from 'react'
import Login from './Login'
import AddMessage from './addMessage'

export default class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login : false,
            error : "",
            username : "" ,
            token : ""
        }
        this.signIn = this.signIn.bind(this)
    }

    componentWillMount = async () => {
        let obj = await fetch('http://localhost:5000/login').then(r => r.json())

        if (obj[0].login === "true") {
            this.setState({ login: true })
            this.setState({ token : obj[0].token })
            this.setState({ username : obj[0].username })
        }
    }

    signIn = async (username, password, event) => {
        event.preventDefault()

        if (username === '' || password === '') {
            this.setState({ error: <h5 className="error">Password o username errati</h5> })
            return
        }

        let response = await fetch("http://localhost:5000/users/" + username, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password })
        }).then((res) => res.json())

        if (response.ok === true) {
            this.setState({ token: response.data.token })
            this.setState({ login: true })
            this.setState({ username : username})

            fetch("http://localhost:5000/login", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login : this.state.login, token : this.state.token, username : this.state.username })
            }).then((res) => res.json())
        }
        else this.setState({ error: <h5 className="error"> Password o username errati! </h5> })
    }

    logout = () => {
        this.setState({ login: false })
        this.setState({ token: "" })
        this.setState({ error: "" })

        fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login : false, token : "", username : "" })
        }).then((res) => res.json())
    }

    render() {
        return (
            <div>
                {this.state.login ? <AddMessage logout={this.logout} /> : <Login signIn={this.signIn} error={this.state.error} />}
            </div>
        )
    }
}