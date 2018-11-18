import React, {Component} from 'react';
import UserNameCreate from './UserNameCreate';
import WebcamRegistration from './WebcamRegistration';
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
        this.setState({user: res});
    }

    render()
    {
        console.log(this.state.user);
        let cmp;

        if(this.state.user === "")
        {
            cmp = <UserNameCreate createdHandler={this.createdHandler}/>;
        }
        else
        {
            cmp = <WebcamRegistration/>;
        }

        return cmp;
    }
}

