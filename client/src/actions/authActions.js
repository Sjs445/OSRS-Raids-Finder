import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    USER_LOADING,
    SET_CURRENT_USER
} from "./types";

//  Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => history.push("/login"))    // redirect to login page
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//  Login and get user token
export const loginUser = (userData) => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            // Set token to local storage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            //  Set token to authorization header
            setAuthToken(token);
            //  Decode token for user data
            const decoded = jwt_decode(token);
            //  Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
};

//  Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

//  User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

//  Logout
export const logout = () => dispatch => {
    //  Remove token from local storage
    localStorage.removeItem("jwtToken");
    //  Remove auth token
    setAuthToken(false);
    //  Set current uer to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};