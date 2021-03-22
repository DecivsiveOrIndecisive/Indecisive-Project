// eslint-disable-next-line
import react from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'


export default (
    <Switch>
        <Route exact path = '/' component={Login} />
        <Route path ='/login' component={Login} />
    </Switch>
)