import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './components/Landing'
import MultiLogin from './components/MultiLogin'
import Login from './components/Login'
import RegisterComponent from './components/Register'

const Content = () => {
    return (
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/login" component={Login}/>
            <Route path="/multi" component={MultiLogin}/>
            <Route path="/register" component= {RegisterComponent}/>
        </Switch>
    );
};

export default Content;