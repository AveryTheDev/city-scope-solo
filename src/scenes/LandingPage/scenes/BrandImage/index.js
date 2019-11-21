import React from 'react';
import './styles.css';
import CityOnGlobe from '../../../../assets/CityOnGlobe.js';


const BrandImage = () => {

    return ( 
        <div className="background">
            <CityOnGlobe/>
            <h1 className="mobile-only">City Scope</h1>
        </div>
     );
}
 
export default BrandImage;