import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
} from '../constants/User'

const initialState = {
    loading: false,
    data: {},
    error: null
}

export default function user(state = initialState, action){
    switch (action.type){
        case GET_USER_REQUEST:
            return { ...state, loading: true};
        case GET_USER_SUCCESS:
            return { ...state, loading: false, data: action.data, error: null};
        case GET_USER_FAIL:
            return { ...state, loading: false, data: {}, error: action.error};
        default:
            return state;
    }
}
