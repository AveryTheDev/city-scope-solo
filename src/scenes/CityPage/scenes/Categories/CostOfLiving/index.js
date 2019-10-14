import './styles.css'

import React from 'react';
import Housing from './Housing';
import Expenses from './Expenses';

const CostOfLiving = ({ secondCity }) => {

    if(secondCity) {
        return ( 
            <div className="cost-of-living">
                <h1>Cost of Living</h1>
                <Housing secondCity/>
                <Expenses secondCity/>
            </div>
        );        
    }
    else {
        return (
        <div className="cost-of-living">
            <h1>Cost of Living</h1>
            <Housing />
            <Expenses />
        </div>
        );      
    }

}
 
export default CostOfLiving;