import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Home from './components/Home'
import UserList from './components/UserList'
import User from './components/User'
/*import Admin from './components/Admin'
import List from './components/List'
import Genre from './components/Genre'
import Release from './components/Release'
import Home from './components/Home'
import NotFound from './components/NotFound'
import LoginPage from './containers/LoginPage'
import requireAuthentication from './containers/AuthenticatedComponent'*/

export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={Home} />
            <Route path='/users' component={UserList}/>
            <Route path='/users/:userId' component={User} />
        </Route>
    </div>
)
