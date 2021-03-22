// eslint-disable-next-line
import react from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Homepage from './components/Homepage'


export default (
    <Switch>
        <Route exact path = '/' component={Homepage} />
        <Route path ='/login' component={Login} />
    </Switch>
)