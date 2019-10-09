import React from 'react';
import './styles.css'

import BrandImage from './scenes/BrandImage';
import CityList from './scenes/CityList';
import IntroText from './scenes/IntroText';

const LandingPage = () => {
    return (
      <>
        <div className="mobile">
          <BrandImage className="icon-panel" />
          <div className="client-panel">
            <IntroText />
            <CityList />              
          </div>
        </div>
        <div className="desktop">
          <BrandImage className="icon-panel" />
          <div className="client-panel">
            <IntroText />
            <CityList />
          </div>
        </div>
      </>
    );
}
 
export default LandingPage;