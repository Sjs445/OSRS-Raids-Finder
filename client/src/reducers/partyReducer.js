import { GET_PARTIES, ADD_PARTY, DELETE_PARTY, PARTIES_LOADING} from '../actions/types';

const initialState = {
    parties: [],
    loading: false,
    
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
        case ADD_PARTY:
            return {
                ...state,
                parties: [action.payload, ...state.parties]
            };
        case PARTIES_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}