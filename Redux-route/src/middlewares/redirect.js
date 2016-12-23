/**
 * Created by ievgen.garlinskyi on 12/23/2016.
 */
import { browserHistory } from 'react-router'
import {
    ROUTING
    } from '../constants/Routing'
export const redirect = store => next => action => { //eslint-disable-line no-unused-vars
    if (action.type === ROUTING) {
        browserHistory[action.payload.method](action.payload.nextUrl)
    }
    return next(action)
}