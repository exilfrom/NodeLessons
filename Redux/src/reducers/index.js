/**
 * Created by Odin on 20.12.2016.
 */
/*
const initialState = {
    //user: 'Unknown User'
    name: 'Василий',
    surname: 'Реактов',
    age: 27
};
export default function userstate(state = initialState) {
    return state;
}*/
import { combineReducers } from 'redux'
import page from './page'
import user from './user'
export default combineReducers({
    page,
    user
})