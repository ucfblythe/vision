import React from 'react';
import UserNameLogin from "./UserNameLogin";
import WebcamVerification from "./WebcamVerification";

export default class MultiLogin extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            descriptors:""
        };

        this.createdHandler = this.createdHandler.bind(this);
    }

    createdHandler(res)
    {
        this.setState({user: res});
        this.getDescriptor(res);
    }

    getDescriptor(res)
    {
        const url = "https://vision-project.herokuapp.com/api/user/"+res+"/";
        fetch(url)
            .then(response => {return response.json();})
            .then(data => {
                this.setState({descriptor: data.descriptor});
                return data.descriptor;
            })
            .catch(err=>
            {
                return false;
            });
    }

    render()
    {
        let cmp;

        if(this.state.descriptor === "")
        {
            cmp = <UserNameLogin createdHandler={this.createdHandler}/>;
        }
        else
        {
            cmp = <WebcamVerification descriptor={this.state.descriptor} onSubmit={this.onSubmit}/>;
        }

        return cmp;
    }
}