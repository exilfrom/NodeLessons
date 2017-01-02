import axios from 'axios';

import {
    GET_USER_LIST_REQUEST,
    GET_USER_LIST_SUCCESS,
    GET_USER_LIST_FAIL,
    //GET_USER_REQUEST,
    //GET_USER_SUCCESS,
    //GET_USER_FAIL,
} from '../constants/User'

export function getUserList(){
    return dispatch => {
        dispatch({
            type: GET_USER_LIST_REQUEST
        });

        axios.get('/api/users')
            .then(function(response){
                dispatch({
                    type: GET_USER_LIST_SUCCESS,
                    userList: response.data
                })
            })
            .catch(function(error){
                dispatch({
                    type: GET_USER_LIST_FAIL,
                    error: error
                })
            })
    }
}