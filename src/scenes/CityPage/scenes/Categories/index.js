import React from 'react';
import './styles.css';
import Climate from './Climate';
import LifeQuality from './LifeQuality';

const Categories = () => {
    return ( 
        <div className="categories">
            <LifeQuality />              
            <Climate />             
        </div>
     );
}
 
export default Categories;