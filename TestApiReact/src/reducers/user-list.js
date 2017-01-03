import {
    GET_USER_LIST_REQUEST,
    GET_USER_LIST_SUCCESS,
    GET_USER_LIST_FAIL
} from '../constants/User'

const initialState = {
    loading: false,
    data: [],
    error: null
}

export default function userList(state = initialState, action){
    switch (action.type){
        case GET_USER_LIST_REQUEST:
            return { ...state, loading: true};
        case GET_USER_LIST_SUCCESS:
            return { ...state, loading: false, data: action.data, error: null};
        case GET_USER_LIST_FAIL:
            return { ...state, loading: false, data: [], error: action.error};
        default:
            return state;
    }
}