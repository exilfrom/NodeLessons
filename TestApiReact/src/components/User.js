import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { getUserById } from '../actions/UserActions'

class User extends Component{
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getUserById(this.props.params.userId))
    }
    render(){
        const { loading, data, error } = this.props;
        if (loading) { return (<div>Loading</div>) }
        if (error != null) { return (<div>Error! {error.toString()}</div>) }
        return(
            <div>
               <span>{data.firstName} {data.lastName} {data.email}</span>
                <Link to='/users'>Back to list</Link>
            </div>
        )
    }
}

User.propTypes = {
    loading: PropTypes.bool.isRequired,
    //data: PropTypes.array.object,
    error: PropTypes.string
}

function mapStateToProps (state) {
    return {
        loading: state.user.loading,
        data: state.user.data,
        error: state.user.error
    }
}

export default connect(mapStateToProps)(User)
