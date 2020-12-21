import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { GET_PARTIES, ADD_PARTY, DELETE_PARTY, PARTIES_LOADING, UPDATE_PARTY, UPDATE_PARTY_LEADER} from './types';

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
                payload: res.data.createdParty
            })
            )
        .catch( err =>  dispatch(returnErrors(err.response.data, err.response.status)));
}

export const joinParty = (id, rsn, userid, isGuide) => (dispatch, getState) => {

    const body = JSON.stringify({ rsn, userid, isGuide });

    axios
        .post(`/api/party/${id}`, body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: UPDATE_PARTY,
                payload: res.data.party
            })
            )
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
}


export const deleteParty = (id) => (dispatch, getState) => {

    axios
        .delete(`/api/party/${id}`, tokenConfig(getState)).then(res =>
                dispatch({
                    type: DELETE_PARTY,
                    payload: id
                })
            ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const removeFromParty = (id, userid) => (dispatch, getState) => {

    const body = JSON.stringify({userid});

    axios
        .post(`/api/party/remove/${id}`, body, tokenConfig(getState)).then(res =>
            dispatch({
                type: UPDATE_PARTY,
                payload: res.data.party
            }))
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const changeLeader = (id, userid, rsn) => (dispatch, getState) => {
    const body = JSON.stringify({userid, rsn});

    axios
        .post(`/api/party/changeleader/${id}`, body, tokenConfig(getState)).then(res => {
            dispatch({
                type: UPDATE_PARTY,
                payload: res.data.partychangedleader
            })
            dispatch({
                type: UPDATE_PARTY_LEADER,
                payload: res.data.partychangedleader
            })
            }
            ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


export const setPartiesLoading = () => {
    return {
        type: PARTIES_LOADING
    }
}

export const subscribe = () => (dispatch, getState) => {
    axios
        .get('/api/party/listener', tokenConfig(getState)).then(res => {

            if(res.data.party) {
                dispatch({
                    type: UPDATE_PARTY,
                    payload: res.data.party
                })
            }
            else if(res.data.id) {
                dispatch({
                    type: DELETE_PARTY,
                    payload: res.data.id
                })
            }
            else if(res.data.createdParty) {
                dispatch({
                    type: ADD_PARTY,
                    payload: res.data.createdParty
                })
            }
            else if(res.data.partychangedleader) {
                dispatch({type: UPDATE_PARTY, payload: res.data.partychangedleader})
                dispatch({type: UPDATE_PARTY_LEADER, payload: res.data.partychangedleader})
            }
         }
        ).catch(err => {
            console.log(JSON.stringify(err))
            if(err.status === 408) {
                console.log('Timeout: Issuing another request.');
                subscribe();
            }
            else{
                dispatch(returnErrors(err.message, err.stack));
            }
        }
        )
}