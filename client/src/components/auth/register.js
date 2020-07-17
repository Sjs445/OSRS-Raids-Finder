import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, FormGroup, FormText, Label, Input, FormFeedback } from 'reactstrap';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            rsn: "",
            errors: {},
            validate: {
                emailState: "",
            }
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value})
    };

    onSubmit = async(e) => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            rsn: this.state.rsn
        }

        try{
            let response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newUser)
            });

            let result = await response.json();
            if(result) {
                alert("Thanks for registering "+result.user.name);
                this.props.history.push("/");
            }
        }
        catch(err) {
            console.log(err);
        }

    };

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

    render() {
        const { errors } = this.state;
        return(
            <div>
            <Container>
                <Col>
                <h1>Register</h1><Link to="/"><Button color="link">Back to home</Button></Link>
                    <Form noValidate onSubmit={this.onSubmit}>
                        <Col>
                        <FormGroup>
                            <Label for="name"><i className="fa fa-user" aria-hidden="true"></i>&nbsp;Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Bob" onChange={this.onChange} value={this.state.name} error={errors.email}/>
                        </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="email"><i className="fa fa-envelope" aria-hidden="true"></i>&nbsp;Email</Label>
                                <Input type="email" name="email" id="email" placeholder="email@example.com"
                                value={this.state.email}
                                error={errors.email}
                                invalid={ this.state.validate.emailState === 'has-danger' }
                                onChange={ (e) => {
                                            this.validateEmail(e)
                                            this.onChange(e)
                                        } }/>
                          <FormFeedback>Please enter a valid email address.</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="password"><i className="fa fa-lock"></i>&nbsp;Password</Label>
                                <Input type="password" name="password" id="password" placeholder="********"
                                onChange={this.onChange}
                                value={ this.state.password} 
                                error={errors.password} />
                                <FormText>Password needs to be at least six characters.</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password2"><i className="fa fa-lock"></i>&nbsp;Confirm Password</Label>
                                <Input type="password" name="password2" id="password2" placeholder="********"
                                onChange={this.onChange}
                                value={ this.state.password2 }
                                error={errors.password2} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="rsn"><i className="fa fa-tag" aria-hidden="true"></i>&nbsp;RSN</Label>
                                <Input type="text" name="rsn" id="rsn" placeholder="Zezima"
                                onChange={this.onChange}
                                value={this.state.rsn}
                                error={errors.rsn} />
                                <FormText>Other users will see you based on RSN.</FormText>
                            </FormGroup>
                        </Col>
                        <Col>
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

export default Register;