import React from 'react';
import './styles.css';
import Climate from './Climate';
import ClimateContextProvider from '../../../../services/context/categories/Climate/ClimateContext';


const Categories = () => {
    return ( 
        <div className="categories">
            <ClimateContextProvider>
                <Climate />                
            </ClimateContextProvider>
        </div>
     );
}
 
export default Categories;