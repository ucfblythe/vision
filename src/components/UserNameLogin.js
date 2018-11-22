import React,{Component} from 'react';
import {Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Col, Row} from 'react-bootstrap';

export default class UserNameLogin extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            valid: false,
            user: []
        };

        this.handleChange = this.textChange.bind(this);
        this.handleSubmit = this.submitUserName.bind(this);
    }

    submitUserName(e)
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
            const url = "https://vision-project.herokuapp.com/api/exists/"+val+"/";
            fetch(url)
                .then(response => {return response.json();})
                .then(data => {
                    this.setState({valid: data.message});
                    return data;
                })
                .catch(err=>
                {
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
                                onClick={this.handleSubmit}>Log in</Button>
                        <HelpBlock style={{textAlign:'center'}}>Login as a pre-registered user</HelpBlock>
                    </FormGroup>
                </Col>
            </Form>
        );
    }
}
