/**
 * Created by Odin on 21.12.2016.
 */
import React, {Component} from 'react';
import { Link } from 'react-router';

export default class NotFound extends Component{
    render(){
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        Page not Found. Back to <Link to='/'>Home</Link>?
                    </div>
                </div>
            </div>
        )
    }
}