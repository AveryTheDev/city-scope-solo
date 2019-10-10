import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "../scenes/LandingPage";
import CityPage from "../scenes/CityPage";
import ComparisonPage from "../scenes/ComparisonPage";
import { ScrollToTop } from "../components/ScrollToTop";

const Router = () => {

  return (
    <>
      <ScrollToTop />
      <Switch>
        <Redirect exact from="/" to="landing" />
        <Route path="/landing" component={LandingPage} />
        <Route path="/citypage" component={CityPage} />
        <Route path="/comparison" component={ComparisonPage} />
      </Switch>
    </>
  );
};

export default Router;
