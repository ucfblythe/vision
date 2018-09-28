import React from 'react';
import ReactDom from 'react-dom';
import {BrowswerRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {Route} from 'react-router-dom';
import App from './App.js';

ReactDom.render(
    <BrowswerRouter>
        <App />
    </BrowswerRouter>,
    document.getElementById('root'));