import React from 'react';
import "./styles.css";

import cityIcon from '../../assets/CityIcon.svg';

import { Link } from "react-router-dom";
import SearchBar from '../Search';

const NavBar = () => {
    return ( 
        <div className="nav-bar">
            <div className="nav-icon-title">
                <Link to="/" className="nav-img">
                    <img src={cityIcon} alt='Back to Home'/> 
                    <h3>City Scope</h3>                                    
                </Link>               
            </div>
            <div className="nav-search-bar">
                <SearchBar />
            </div>
        </div>
     );
}
 
export default NavBar;