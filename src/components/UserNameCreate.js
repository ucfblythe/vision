import React,{Component} from 'react';
import {Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Col, Row} from 'react-bootstrap';

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

        if(this.state.valid)
        {
            this.props.createdHandler(this.state.value);
        }
    }

    validateUserName()
    {
        if(this.state.value.length < 5 || this.state.value === "john_doe")
        {
            return null;
        }

        if(this.state.valid)
        {
            return "success";
        }
        else
        {
            return "error";
        }
    }

    textChange(e)
    {
        let val = e.target.value;
        this.setState({value: val});
        if(val.length >= 5)
        {
            const url = "https://vision-project.herokuapp.com/api/user/exists?user="+val;
            fetch(url)
                .then(response => {return response.json();})
                .then(data => {
                    this.setState({valid: !data.message});
                    return data;
                })
                .catch(err=>
                {
                    this.setState({valid: false});
                    return false;
                });
        }
        else
        {
            this.setState({valid: false});
        }
    }

    render()
    {
        return (
            <Form inline>
                <Col xsOffset={4} xs={5} sm={5} mdOffset={4} lgOffset={5}>
                    <FormGroup controlId="formInlineName" validationState={this.validateUserName()}>
                        <ControlLabel style={{display:'inline', marginRight:'10px', fontSize:'20px'}}>Name</ControlLabel>
                        <FormControl style={{display:'inline', marginRight:'10px'}} type="text"
                                     placeholder="john_doe"
                                     value={this.state.value}
                                     onChange={this.handleChange}
                        />
                        <Button type="submit" bsStyle="primary" style={{display:'inline', marginRight:'10px'}}
                                onClick={this.handleSubmit}>Register</Button>
                        <HelpBlock style={{textAlign:'center'}}>Begin registration by entering a username</HelpBlock>
                    </FormGroup>
                </Col>
            </Form>
        );
    }
}
