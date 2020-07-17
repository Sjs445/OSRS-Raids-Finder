import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {},
            validate: {
                emailState: ""
            }
        };
    }


    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = async(e) => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        try{
            let response = await fetch('/api/users/login', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(userData)
            });
            let result = await response.json();

            if(result) {
                sessionStorage.setItem('token', result.token);
            }
        
            if(sessionStorage.getItem("token")) {
                // console.log("User has token "+sessionStorage.token);
                this.props.history.push('/');
            }
        }
        catch(err){
            console.log(err);
        }
    }

    validateEmail = e => {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state
          if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
          } else {
            validate.emailState = 'has-danger'
          }
          this.setState({ validate })
    };

    render(){
        const { errors } = this.state;

        return(
            <div>
                <Container>
                    <Col>
                        <h1>Login</h1>
                        <Link to="/"><Button color="link">Back to home</Button></Link>
                        <Form noValidate onSubmit={this.onSubmit}>
                            <Col>
                            <FormGroup>
                                <Label for="email"><i className="fa fa-envelope" aria-hidden="true"></i>&nbsp;Email</Label>
                                <Input type="email" name="email" id="email" placeholder="email@example.com" 
                                value={this.state.email}
                                error={errors.email}
                                invalid={this.state.validate.emailState === 'has-danger'}
                                onChange={ (e) => {
                                    this.validateEmail(e)
                                    this.onChange(e)
                                }}
                                />
                                <FormFeedback>Please enter a valid email address.</FormFeedback>
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <Label for="password"><i className="fa fa-lock" aria-hidden="true"></i>&nbsp;Password</Label>
                                <Input type="password" name="password" id="password" placeholder="********"
                                value={this.state.password}
                                error={errors.password}
                                onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" value="Submit">Submit</Button>
                            </FormGroup>
                            </Col>
                        </Form>
                        </Col>
                </Container>
            </div>
        )
    };
};

export default Login;