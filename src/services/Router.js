import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "../scenes/LandingPage";
import CityPage from "../scenes/CityPage";

const Router = () => {

  return (
    <Switch>
      <Redirect exact from="/" to="landing" />
      <Route path="/landing" component={LandingPage} />
      <Route path="/citypage" component={CityPage} />
    </Switch>
  );
};

export default Router;
