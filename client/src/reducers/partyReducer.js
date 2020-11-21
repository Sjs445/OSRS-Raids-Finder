import { GET_PARTIES, ADD_PARTY, DELETE_PARTY, UPDATE_PARTY, PARTIES_LOADING, UPDATE_PARTY_LEADER} from '../actions/types';

const initialState = {
    parties: [],
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PARTIES:
            return {
                ...state,
                parties: action.payload,
                loading: false
            };
        case DELETE_PARTY:
            return {
                ...state,
                parties: state.parties.filter(party => party._id !== action.payload)
            };
        case UPDATE_PARTY:
            return {
                ...state,
                parties: state.parties.map(
                    (party) => party._id === action.payload._id ? {...party, users: action.payload.users}
                    : party
                )
            };
        case UPDATE_PARTY_LEADER:
            return {
                ...state,
                parties: state.parties.map(
                    (party) => party._id === action.payload._id ? {...party, partyLeader: action.payload.partyLeader}
                    : party
                    )
            }
        case ADD_PARTY:
            return {
                ...state,
                parties: [action.payload, ...state.parties]
            };
        case PARTIES_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}