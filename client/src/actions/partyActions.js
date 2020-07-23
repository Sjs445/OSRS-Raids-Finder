import axios from 'axios';
import { GET_PARTIES, ADD_PARTY, DELETE_PARTY, PARTIES_LOADING} from './types';

export const getParties = () => dispatch => {
    dispatch(setPartiesLoading());
    axios
        .get('/api/party/all')
        .then(res => 
            dispatch({
                type: GET_PARTIES,
                payload: res.data
            })
            )
}

export const addParty = (party) => dispatch => {
    axios
        .post('/api/party/new', party)
        .then(res => 
            dispatch({
                type: ADD_PARTY,
                payload: res.data
            })
            )
}


export const deleteParty = (id) => dispatch => {
    axios
        .delete(`/api/party/${id}`).then(res =>
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