import React from 'react';
import {Button, Col} from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import UserNameLogin from "./UserNameLogin";

const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };

const Landing = () => {
    return(
        <div>
            <Jumbotron>
                <h1>Vision Verification System</h1>
                <p>A vision based login system that uses neural network techniques <br/>
                    to extract facial features that can verify your identity.</p>
                <div className="well" style={wellStyles}>
                    <Button bsStyle="primary" href="/Register"  block>Register</Button>
                    <Button href="/login" style ={{marginTop:'10px'}} block>Login</Button>
                    <Button href="/multi" style ={{marginTop:'10px'}} block>Multi User Login</Button>
                </div>
            </Jumbotron>
        </div>

    )
};

export default Landing