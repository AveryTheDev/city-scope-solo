import React from 'react';
import './styles.css';
import Climate from './Climate';
import LifeQuality from './LifeQuality';
import Education from './Education';
import CostOfLiving from './CostOfLiving';
import Safety from './Safety';

const Categories = () => {
    return ( 
        <div className="categories">
            <LifeQuality />              
            <Climate />    
            <Education />       
            <CostOfLiving />  
            <Safety />
        </div>
     );
}
 
export default Categories;