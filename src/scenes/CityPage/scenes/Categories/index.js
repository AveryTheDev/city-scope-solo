import React from 'react';
import './styles.css';
import Climate from './Climate';
import LifeQuality from './LifeQuality';
import Education from './Education';

const Categories = () => {
    return ( 
        <div className="categories">
            <LifeQuality />              
            <Climate />    
            <Education />         
        </div>
     );
}
 
export default Categories;