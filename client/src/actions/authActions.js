import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from './types';
import { get } from 'mongoose';

//  Check token and load user
export const loadUser = () => (dispatch, getState) => {
    //  User loading
    dispatch({ type: USER_LOADING });

   

    //  Fetch the user
    axios.get('/api/users/data', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            });
        });
};

//  Register User
export const register = ({ name, email, password, rsn }) => dispatch => {
    //  Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //  Request Body
    const body = JSON.stringify({ name, email, password, rsn });

    axios.post('/api/users/register', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => { 
            dispatch(returnErrors(err.response.data, err.response.status), 'REGISTER_FAIL')
            dispatch({
            type: REGISTER_FAIL
        });
    });
}


//  Setup config/headers and token
export const tokenConfig = getState => {
     //  Get token from localStorage
     const token = getState().auth.token;

     //  Headers
     const config = {
         headers: {
             "Content-type": "application/json"
         }
     }
 
     //  If token, add to headers
     if(token) {
         config.headers['x-auth-token'] = token;
     }

     return config;
};