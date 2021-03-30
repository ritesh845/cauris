import './App.css';
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import React from 'react';
import Home from './components/home';
import Login from './components/login';
import Talent from './components/talent';
import Dashboard from './components/dashboard';
class App extends React.Component {

    render(){
        return (
            <>
            <Router>
                <Switch>
                    <Route path="/dashboard" >
                        <Dashboard />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/talents">
                        <Talent />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </>
        )
    }
}

export default App;
