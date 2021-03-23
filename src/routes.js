// eslint-disable-next-line
import react from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import MapDark from "./components/Map/Map";

export default (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Switch>
);
