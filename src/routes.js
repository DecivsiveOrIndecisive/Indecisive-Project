// eslint-disable-next-line
import react from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import Result from "./components/Result";
import History from "./components/History"

export default (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/result" component={Result} />
    <Route path="/history" component={History} />
  </Switch>
);
