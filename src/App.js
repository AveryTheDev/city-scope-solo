import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./services/Router";
import ChosenCityContextProvider from "./services/context/ChosenCityContext";
import ComparisonContextProvider from "./services/context/ComparisonContext";

const App = () => {
  return (
    <BrowserRouter>
      <ChosenCityContextProvider>
        <ComparisonContextProvider>
          <Router />        
        </ComparisonContextProvider>      
      </ChosenCityContextProvider>
    </BrowserRouter>
  );
};

export default App;
