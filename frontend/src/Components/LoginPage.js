import React, { Component } from 'react'
import Login from './Login'
import AddMessage from './addMessage'

export default class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login: true,
            error : '',
            token: ''
        }
        this.signIn = this.signIn.bind(this)
    }

    signIn = async (username, password, event) => {
        event.preventDefault()

        if(username === '' || password === ''){
            this.setState({ error : <h5 className="error">Password o username errati</h5>})
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
   
        if(response.ok === true){
            this.setState({token : response.data.token})
            this.setState({ login: false })
            this.setState({ error : ''})
        }
        else  this.setState({ error : <h5 className="error">Password o username errati!</h5>})
    }

    logout = () => {
        this.setState({ login: true })
    }

    render() {
        return (
            <div>
                {this.state.login ? <Login signIn={this.signIn} error={this.state.error} /> : <AddMessage logout={this.logout} />}
            </div>
        )
    }
}