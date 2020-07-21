import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import partyReducer from './partyReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    party: partyReducer
});