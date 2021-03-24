// eslint-disable-next-line
import react from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import Result from "./components/Result";

export default (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/result" component={Result} />
  </Switch>
);
