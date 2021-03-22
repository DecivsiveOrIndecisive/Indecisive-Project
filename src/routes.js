// eslint-disable-next-line
import react from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import MapDark from "./components/Map/Map";

export default (
  <Switch>
    <Route exact path="/" component={MapDark} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Switch>
);
