import {
    GET_USER_LIST_REQUEST,
    GET_USER_LIST_SUCCESS,
    GET_USER_LIST_FAIL,
    //GET_USER_REQUEST,
    //GET_USER_SUCCESS,
    //GET_USER_FAIL,
} from '../constants/User'

const initialState = {
    loading: false,
    userList: [],
    error: null
}

export default function user(state = initialState, action){
    switch (action.type){
        case GET_USER_LIST_REQUEST:
            return { ...state, loading: true};
        case GET_USER_LIST_SUCCESS:
            return { ...state, loading: false, userList: action.userList, error: null};
        case GET_USER_LIST_FAIL:
            return { ...state, loading: false, userList: [], error: action.error};
        default:
            return state;
    }
}