import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home/home";
import Test from "./pages/test/test";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/test" exact component={Test} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
