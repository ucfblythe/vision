import React from 'react';
import {Link} from 'react-router-dom';
const Menu = () => {
    return(
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">About</Link></li>
            <li><Link to="/">Contact</Link></li>
        </ul>
    )
};

export default Menu