import { GET_PARTIES, ADD_PARTY, DELETE_PARTY} from '../actions/types';

const initialState = {
    parties: [
        {id: 1, raidType: 'XOC', clanChat: 'Shanes345', users: ['Shanes345',
        'Kart191']}
    ]
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PARTIES:
            return {
                ...state
            };
        case DELETE_PARTY:
            return {
                ...state,
                parties: state.parties.filter(party => party.id !== action.payload)
            };
        case ADD_PARTY:
            return {
                ...state,
                parties: [action.payload, ...state.parties]
            }
        default:
            return state;
    }
}