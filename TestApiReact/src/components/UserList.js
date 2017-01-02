import React, {Component, PropTypes} from 'react';
//import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { getUserList } from '../actions/UserActions'

class UserList extends Component{
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getUserList())
    }
    render(){
        const { loading, userList, error } = this.props;
        if (loading) { return (<div>Loading</div>) }
        if (error != null) { return (<div>Error!</div>) }
        return(
            <div>
                <ul>
                {userList.map(function(el, index){
                    return(
                        <li key={index}>{el.email} <Link to ={'/users/' + el._id}>View</Link></li>
                    )
                })}
                </ul>
            </div>
        )
    }
}

UserList.propTypes = {
    loading: PropTypes.bool.isRequired,
    userList: PropTypes.array.isRequired,
    error: PropTypes.string
}

function mapStateToProps (state) {
    return {
        loading: state.user.loading,
        userList: state.user.userList,
        error: state.user.error
    }
}

export default connect(mapStateToProps)(UserList)
