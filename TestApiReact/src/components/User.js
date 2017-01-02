import React, {Component} from 'react';

export default class User extends Component{
    render(){
        return(
            <div>
                will be user {this.props.params.userId}
            </div>
        )
    }
}
