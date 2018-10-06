import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './components/Landing'
import Login from './components/Login'

const Content = () => {
    return (
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/login" component={Login}/>
        </Switch>
    );
};

export default Content;