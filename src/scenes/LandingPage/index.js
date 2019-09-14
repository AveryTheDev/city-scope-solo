import React from 'react';
import './styles.css'

import BrandImage from './scenes/BrandImage';
import CityList from './scenes/CityList';
import IntroText from './scenes/IntroText';

const LandingPage = () => {
    return ( 
        <>
            <div className="mobile">
                <BrandImage />
                <IntroText />                
                <CityList />
            </div>
            <div className="desktop">
                <BrandImage />
                <div className="clientPanel">
                    <IntroText />                    
                    <CityList />
                </div>
            </div>
        </>

     );
}
 
export default LandingPage;