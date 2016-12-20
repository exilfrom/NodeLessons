/**
 * Created by Odin on 21.12.2016.
 */
import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS
    } from '../constants/Page'

export function getPhotos(year) {
    return (dispatch) => {
        dispatch({
            type: GET_PHOTOS_REQUEST,
            payload: year
        })
        setTimeout(() => {
            dispatch({
                type: GET_PHOTOS_SUCCESS,
                payload: [1,2,3,4,5]
            })
        }, 1000)
    }
}