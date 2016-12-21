/**
 * Created by Odin on 21.12.2016.
 */
import React, {Component} from 'react';

export default class Admin extends Component{
    static onEnter(nextState, replace) {
        const login = window.localStorage.getItem('rr_login')
        if (login !== 'admin') {
            replace('/')
        }
    }
    render(){
        return(
            <div className='row'>
                <div className='col-md-2'>Section /admin </div>
            </div>
        )
    }
}