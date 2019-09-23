import React from 'react';
import './styles.css';
import Climate from './Climate';
import LifeQuality from './LifeQuality';
import Education from './Education';
import Housing from './CostOfLiving/Housing';

const Categories = () => {
    return ( 
        <div className="categories">
            <LifeQuality />              
            <Climate />    
            <Education />       
            <Housing />  
        </div>
     );
}
 
export default Categories;