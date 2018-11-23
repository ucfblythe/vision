import React from 'react';
import WebcamIdentification from "./WebcamIdentification";
import WebcamVerification from "./WebcamVerification";

export default class MultiLogin extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            descriptor:"",
            loaded:false
        };

        this.createdHandler = this.createdHandler.bind(this);

        this.getDescriptors()
    }

    componentDidMount() {
        this.setState({loaded:true});
    }

    createdHandler(res)
    {
        this.setState({user: res});
        this.getDescriptor(res);
    }

    getDescriptors()
    {
        const url = "https://vision-project.herokuapp.com/api/users/";
        fetch(url)
            .then(response => {return response.json();})
            .then(data => {
                data.forEach(function(dsc)
                {
                    dsc.descriptor = new Float32Array(dsc.descriptor.split(",").map(Number));
                });

                this.setState({descriptor:data});
                return data;
            })
            .catch(err=>
            {
                return false;
            });
    }

    render()
    {
        if(this.state.descriptor)
        {
            return <WebcamIdentification descriptor={this.state.descriptor}/>;
        }

        return "";
    }
}