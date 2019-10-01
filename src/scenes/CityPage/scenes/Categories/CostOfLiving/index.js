import './styles.css'

import React from 'react';
import Housing from './Housing';
import Expenses from './Expenses';

const CostOfLiving = () => {
    return ( 
        <div className="cost-of-living">
            <h1>Cost of Living</h1>
            <Housing />
            <Expenses />
        </div>
     );
}
 
export default CostOfLiving;