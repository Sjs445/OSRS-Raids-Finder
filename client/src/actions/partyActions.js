import { GET_PARTIES, ADD_PARTY, DELETE_PARTY} from './types';

export const getParties = () => {
    return {
        type: GET_PARTIES
    };
}

export const deleteParty = (id) => {
    return {
        type: DELETE_PARTY,
        payload: id
    };
}


export const addParty = (party) => {
    return {
        type: ADD_PARTY,
        payload: party
    };
}