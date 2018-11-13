import React, {Component} from 'react';
import UserNameCreate from './UserNameCreate';
import Webcam from 'react-webcam';
export default class RegisterComponent extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            center: "",
            left: "",
            right: ""
        };

        this.createdHandler = this.createdHandler.bind(this)
    }

    createdHandler(res)
    {
        alert(res);
        this.setState({user: res})
    }
    render()
    {
        if(this.state.user === "") {
            return (
                <UserNameCreate createdHandler={this.createdHandler}/>
            );
        }
        else
        {
            return this.state.user;
        }
    }
}

