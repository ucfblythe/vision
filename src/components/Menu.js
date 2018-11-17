import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavbarCollapse from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

const Menu = () => {
    return(
        <Navbar inverse collapseOnSelect fluid>
            <Navbar.Header>
                <Navbar.Brand>
                    <img src="../../img/vision-logo.png" alt="Vision Logo"/>
                    <a href="/">Vision</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1} href="/About" >About</NavItem>
                    <NavItem eventKey={2} href="/Source">Source</NavItem>
                    <NavItem eventKey={3} href="/Contact">Contact</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Menu