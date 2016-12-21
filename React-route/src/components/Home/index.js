/**
 * Created by Odin on 21.12.2016.
 */
import React, {Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

export default class Home extends Component{
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
    }
    routerWillLeave() {
        let answer = window.confirm('Are you sure?')
        if (!answer) return false
    }
    handleSubmit(e) {
        e.preventDefault()
        const value = e.target.elements[0].value.toLowerCase()
        browserHistory.push(`/genre/${value}`)
    }
    render(){
        return(
            <div className='row'>
                <div className='col-md-2'>Section / </div>
                <form className='col-md-4' onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='genreName'/>
                    <button type='submit'>Go...</button>
                </form>
            </div>
        )
    }
}

Home.contextTypes = {
    router: PropTypes.object.isRequired
}