import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SignIn from './components/SignIn'
import Home from './components/Home'
import AddMessage from './components/AddMessage'
import SignUp from './components/SignUp'

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={SignIn} />
        <Route path="/new_message" component={AddMessage} />
        <Route path="/register" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
