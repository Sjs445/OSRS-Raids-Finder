import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { GET_PARTIES, ADD_PARTY, DELETE_PARTY, PARTIES_LOADING} from './types';
import { get } from 'mongoose';

export const getParties = () => (dispatch, getState) => {
    dispatch(setPartiesLoading());
    axios
        .get('/api/party/all', tokenConfig(getState))
        .then(res => 
            dispatch({
                type: GET_PARTIES,
                payload: res.data.party
            })
            )
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addParty = (party) => (dispatch, getState) => {
    axios
        .post('/api/party/new', party, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: ADD_PARTY,
                payload: res.data
            })
            )
        .catch( err =>  dispatch(returnErrors(err.response.data, err.response.status)));
}


export const deleteParty = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/party/${id}`, tokenConfig(getState)).then(res =>
                dispatch({
                    type: DELETE_PARTY,
                    payload: id
                })
            )
}


export const setPartiesLoading = () => {
    return {
        type: PARTIES_LOADING
    }
}