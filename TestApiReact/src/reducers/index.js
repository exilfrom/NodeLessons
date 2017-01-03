import { combineReducers } from 'redux';
import userList from './user-list';
import user from './user';

export const rootReducer = combineReducers({
    userList,
    user
})
