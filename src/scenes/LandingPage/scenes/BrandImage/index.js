import React from 'react';
import './styles.css';
import cityOnGlobe from '../../../../assets/CityOnGlobe.svg';


const BrandImage = () => {
    return ( 
        <div className="background">
            <img src={cityOnGlobe} alt="globe figure" />
            <h1 className="mobile-only">City Scope</h1>
        </div>
     );
}
 
export default BrandImage;