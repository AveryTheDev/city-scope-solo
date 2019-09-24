import React from 'react';
import './styles.css';
import Climate from './Climate';
import LifeQuality from './LifeQuality';
import Education from './Education';
import CostOfLiving from './CostOfLiving';
import Safety from './Safety';
import Population from './Population';

const Categories = () => {
    return ( 
        <div className="categories">
            <Population />
            <LifeQuality />              
            <Climate />    
            <Education />       
            <CostOfLiving />  
            <Safety />
        </div>
     );
}
 
export default Categories;