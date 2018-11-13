import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

const Landing = () => {
    return(
        <div>
            <Jumbotron>
                <h1>Vision Verification System</h1>
                <p>A vision based login system that uses deep learning <br/> techniques to extract
                    facial features that can verify your identity.</p>
                <p>
                    <Button bsStyle="primary" href="/Register">Register</Button>
                    <Button bsStyle="primary" href="/Login">Login</Button>
                </p>
            </Jumbotron>
        </div>

    )
};

export default Landing