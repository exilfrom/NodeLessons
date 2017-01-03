import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Home from './components/Home'
import UserList from './components/UserList'
import User from './components/User'

export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={Home} />
            <Route path='/users' component={UserList}/>
            <Route path='/users/:userId' component={User} />
        </Route>
    </div>
)
