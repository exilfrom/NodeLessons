/**
 * Created by Odin on 22.12.2016.
 */
import React, { Component } from 'react'
import { browserHistory } from 'react-router';

export default class Login extends Component {
    handleSubmit(e) {
        e.preventDefault()
        const value = e.target.elements[0].value
        window.localStorage.setItem('rr_login', value)
        browserHistory.push(value==='admin' ? '/admin' : '/')
    }
    render() {
        return (
            <div className='row'>
                <div className='col-md-12'>Please enter login:</div>
                <form className='col-md-4' onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='login'/>
                    <button type='submit'>Login</button>
                </form>
            </div>
        )
    }
}