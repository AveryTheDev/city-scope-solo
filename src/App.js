import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./services/Router";
import ChosenCityContextProvider from "./services/context/ChosenCityContext";

const App = () => {
  return (
    <BrowserRouter>
      <ChosenCityContextProvider>
        <Router />
      </ChosenCityContextProvider>
    </BrowserRouter>
  );
};

export default App;
