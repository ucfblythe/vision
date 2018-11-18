import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'idempotent-babel-polyfill';
import App from './App.js';

if (module.hot) {
    module.hot.accept();
}

ReactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'));