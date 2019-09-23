import React from 'react';
import './styles.css';
import Climate from './Climate';
import LifeQuality from './LifeQuality';
import Education from './Education';
import CostOfLiving from './CostOfLiving';

const Categories = () => {
    return ( 
        <div className="categories">
            <LifeQuality />              
            <Climate />    
            <Education />       
            <CostOfLiving />  
        </div>
     );
}
 
export default Categories;