import React,{Component} from 'react';
import {Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

export default class UserNameCreate extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            valid: false,
            user: []
        };

        this.handleChange = this.textChange.bind(this);
        this.handleSubmit = this.isNewUserName.bind(this);
    }

    isNewUserName(e)
    {
        e.preventDefault();

        if(this.isValidUserName())
        {
            const url = "http://127.0.0.1:8000/api/user/exists?user="+this.state.value;
            fetch(url)
                .then(response => {return response.json();})
                .then(data => {
                    if(!data.message)
                    {
                        this.props.createdHandler(this.state.value);
                    }
                })
                .catch(err=> alert('ERROR: ' + err));
        }
    }

    isValidUserName()
    {
        return this.state.value.length > 5;
    }

    validateUserName()
    {
        if(! this.isValidUserName())
        {
            return null;
        }

        return "success";
    }

    textChange(e)
    {
        e.preventDefault();
        this.setState({value: e.target.value})
    }

    render()
    {
        return (
            <Form inline>
                <FormGroup controlId="formInlineName" validationState={this.validateUserName()}>
                    <ControlLabel>Name</ControlLabel>{' '}
                    <FormControl type="text"
                                 placeholder="Please enter a username"
                                 value={this.state.value}
                                 onChange={this.handleChange}
                    />
                </FormGroup>
                <Button type="submit" bsStyle="primary" onClick={this.handleSubmit}>Create</Button>
            </Form>
        );
    }
}
