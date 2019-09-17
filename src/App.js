import React from 'react';
import LandingPage from './scenes/LandingPage';
import ChosenCityContextProvider from './services/context/ChosenCityContext';

const App = () => {
  return <ChosenCityContextProvider><LandingPage /></ChosenCityContextProvider> 
}
 
export default App;
