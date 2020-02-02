import React from "react";
import { Switch, Route } from "react-router-dom";

// Pages
import Main from "../pages/Main";
import Devs from "../pages/Devs";
import Login from "../pages/Login";
import User from "../pages/User";
import Profile from "../pages/Profile";

function Router() {
  return (
    <>
      <Switch>
        <Route path="/" exact={true} component={Main} />
        <Route path="/devs" exact={true} component={Devs} />
        <Route path="/login" exact={true} component={Login} />
        <Route path="/user" exact={true} component={User} />
        <Route path="/profile" exact={true} component={Profile} />
      </Switch>
    </>
  );
}

export default Router;
