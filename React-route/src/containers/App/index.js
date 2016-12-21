import React, { Component } from 'react';
import NavLink from '../../components/NavLink'

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <ul className='nav nav-pills'>
                    <li><NavLink to='/' onlyActiveOnIndex={true}>Home</NavLink></li>
                    <li><NavLink to='/admin'>Admin</NavLink></li>
                    <li><NavLink to='/list'>Genre List</NavLink></li>
                    <li><NavLink to='/login'>Login</NavLink></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}
