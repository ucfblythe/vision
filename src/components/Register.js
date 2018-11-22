import React, {Component} from 'react';
import UserNameCreate from './UserNameCreate';
import WebcamRegistration from './WebcamRegistration';
export default class RegisterComponent extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            descriptor:""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.createdHandler = this.createdHandler.bind(this);
    }

    onSubmit(detection)
    {
        this.setState({descriptor: detection.toString()});
        const data = {user: this.state.user, descriptor: detection.toString()};
        const url = "https://vision-project.herokuapp.com/api/user/"+this.state.user+"/";
        fetch(url, {method: 'POST', body: JSON.stringify(data),
            headers: {"Content-Type": "application/json; charset=utf-8"}
        })
            .then(response => {return response.json()})
            .then(res => console.log(res));

    }

    createdHandler(res)
    {
        this.setState({user: res});
    }

    render()
    {
        let cmp;

        if(this.state.user === "")
        {
            cmp = <UserNameCreate createdHandler={this.createdHandler}/>;
        }
        else
        {
            cmp = <WebcamRegistration onSubmit={this.onSubmit}/>;
        }

        return cmp;
    }
}

