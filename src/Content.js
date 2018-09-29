import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './components/Landing'
import Menu from './components/Menu'

const Content = () => {
    return (
        <Switch>
            <Route exact path="/" component={Landing}/>
        </Switch>
    );
};

export default Content;