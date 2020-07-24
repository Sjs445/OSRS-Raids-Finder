import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import classnames from 'classnames';

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
    
    componentDidMount() {
        if(this.props.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentDidUpdate(prevProps) {

        const { error } = this.props;

        if(error !== prevProps.error) {
            //  Check for login error
            if(error.id === 'LOGIN_FAIL') {
                this.setState({
                    errors: error.msg
                });
                return;
            }
            else {
                this.setState({
                    errors: {}
                });
                return;
            }
        }

        if(this.props.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
        
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

        //  Attempt to login
        this.props.login(userData);
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
                                className={classnames("", {
                                    invalid: errors.email
                                })}
                                />
                                <span style={{color: "red"}}>{errors.email}</span>
                                <FormFeedback>Please enter a valid email address.</FormFeedback>
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <Label for="password"><i className="fa fa-lock" aria-hidden="true"></i>&nbsp;Password</Label>
                                <Input type="password" name="password" id="password" placeholder="********"
                                value={this.state.password}
                                error={errors.password}
                                onChange={this.onChange}
                                className={classnames("", {
                                    invalid: errors.password
                                })}
                                />
                                <span style={{color: "red"}}>{errors.password}</span>
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

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(
    mapStateToProps,
    { login, clearErrors }
)(Login);