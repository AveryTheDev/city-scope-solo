import React from 'react';
import './styles.css';
import Climate from './Climate';
import LifeQuality from './LifeQuality';
import Education from './Education';
import CostOfLiving from './CostOfLiving';
import Safety from './Safety';
import Population from './Population';
import Salary from './Salary';

const Categories = () => {
    return ( 
        <div className="categories">
            <Population />
            <LifeQuality />              
            <Climate />    
            <Salary />
            <Education />       
            <CostOfLiving />  
            <Safety />
        </div>
     );
}
 
export default Categories;