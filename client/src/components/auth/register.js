import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Container, Col, Button, Form, FormGroup, FormText, Label, Input, FormFeedback, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import classnames from 'classnames';

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
            },
            isGuide: false,
            botValidator: {
                num1: Math.floor(Math.random() * Math.floor(10)),
                num2: Math.floor(Math.random() * Math.floor(10)),
            },
            botAnswer: ""
        };

    }

    componentDidMount() {
        if(this.props.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }


    componentDidUpdate(prevProps) {

        const { error } = this.props;

        if(error !== prevProps.error) {
            //  Check for register error
            if(error.id === 'REGISTER_FAIL') {
                this.setState({
                    errors: error.msg
                });
           }
            else {
                this.setState({
                    errors: {}
                });
            }
        }

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value})
    };

    onCheckChange = () => {
        this.setState({
            isGuide: !this.state.isGuide
        })
    };

    onSubmit = async(e) => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            rsn: this.state.rsn,
            isGuide: this.state.isGuide,
            botValidator: this.state.botValidator,
            botAnswer: this.state.botAnswer
        }

        //  Attempt to register
        this.props.register(newUser);
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

        if(this.props.isAuthenticated) {
            return <Redirect to="/dashboard" />
        }

        if(this.props.isLoading) {
            return (
                <div>
                    <Container>
                        <Col>
                        <div style={{margin: '0 auto'}}>
                        <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
                        </div>
                        </Col>
                    </Container>
                </div>
            )
        }

        if(this.props.user) {
            return(
                <div>
                    <Container>
                        <Col>
                        <h1>Thanks for registering {this.props.user.name}</h1>
                        <a href="/login">Login</a>
                        </Col>
                    </Container>      
                </div>
            )
        }
        
        const { errors } = this.state;
        const { botValidator } = this.state;
        return(
            <div>
            <Container>
                <Col>
                <h1>Register</h1><Link to="/"><Button color="link">Back to home</Button></Link>
                    <Form noValidate onSubmit={this.onSubmit}>
                        <Col>
                        <FormGroup>
                            <Label for="name"><i className="fa fa-user" aria-hidden="true"></i>&nbsp;Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Bob" onChange={this.onChange} value={this.state.name} error={errors.name}
                             className={classnames("", {
                                 invalid: errors.name
                             })}/>
                             <span style={{color: "red"}}>{errors.name}</span>
                        </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="email"><i className="fa fa-envelope" aria-hidden="true"></i>&nbsp;Email</Label>
                                <Input type="email" name="email" id="email" placeholder="email@example.com"
                                value={this.state.email}
                                invalid={ this.state.validate.emailState === 'has-danger' }
                                onChange={ (e) => {
                                            this.validateEmail(e)
                                            this.onChange(e)
                                        } }
                                className={classnames("", {
                                    invalid: errors.email
                                })} />
                                <span style={{color: "red"}}>{errors.email}</span>
                          <FormFeedback>Please enter a valid email address.</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="password"><i className="fa fa-lock"></i>&nbsp;Password</Label>
                                <Input type="password" name="password" id="password" placeholder="********"
                                onChange={this.onChange}
                                value={ this.state.password}
                                className={classnames("", {
                                    invalid: errors.password
                                })}  />
                                <span style={{color: "red"}}>{errors.password}</span>
                                <FormText>Password needs to be at least six characters.</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password2"><i className="fa fa-lock"></i>&nbsp;Confirm Password</Label>
                                <Input type="password" name="password2" id="password2" placeholder="********"
                                onChange={this.onChange}
                                value={ this.state.password2 }
                                className={classnames("", {
                                    invalid: errors.password2
                                })} />
                                <span style={{color: "red"}}>{errors.password2}</span>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="rsn"><i className="fa fa-tag" aria-hidden="true"></i>&nbsp;RSN</Label>
                                <Input type="text" name="rsn" id="rsn" placeholder="Zezima"
                                onChange={this.onChange}
                                value={this.state.rsn}
                                className={classnames("", {
                                    invalid: errors.rsn
                                })} />
                                <span style={{color: "red"}}>{errors.rsn}</span>
                                <FormText>Other users will see you based on RSN.</FormText>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup check>
                                <Label for="isGuide" check>
                                <Input type="checkbox"
                                name="isGuide"
                                id="isGuide"
                                checked={this.state.isGuide}
                                onChange={this.onCheckChange}
                                value={this.state.isGuide}
                                />{' '}
                                I would like to be a raid guide <br /><br />
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="botAnswer"><i class="fa fa-id-card" aria-hidden="true"></i>&nbsp;Please answer this question to prove you're human: {botValidator.num1}+{botValidator.num2} = </Label>
                                <Input type="text" name="botAnswer" id="botAnswer"
                                onChange={this.onChange}
                                value={this.state.botAnswer}
                                className={classnames("", {
                                    invalid: errors.botAnswer
                                })} />
                                <span style={{color: "red"}}>{errors.botAnswer}</span>
                            </FormGroup>
                        </Col>
                        <Col>
                        <br />
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
        
Register.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user,
    isLoading: state.auth.isLoading
});

export default connect(
    mapStateToProps,
    { register, clearErrors }
)(Register);