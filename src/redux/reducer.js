import { combineReducers } from 'redux';
import user from './users'
import questions from './questions';

export default combineReducers({
    user,
    questions,
})