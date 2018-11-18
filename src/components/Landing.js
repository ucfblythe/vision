import React from 'react';
import {Button, Col} from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };

const Landing = () => {
    return(
        <div>
            <Jumbotron>
                <h1>Vision Verification System</h1>
                <p>A vision based login system that uses neural network techniques <br/>
                    to extract facial features that can verify your identity.</p>
                <div className="well" style={wellStyles}>
                    <Col>
                        <Button bsStyle="primary" href="/Register"  block>Register</Button>
                    </Col>
                    <Col>
                        <Button href="/Login" style ={{marginTop:'10px'}} block>Login</Button>
                    </Col>
                </div>
            </Jumbotron>
        </div>

    )
};

export default Landing