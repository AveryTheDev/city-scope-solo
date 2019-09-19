import React from 'react';
import "./styles.css";

import cityIcon from '../../assets/CityIcon.svg';

import { Link } from "react-router-dom";
import SearchBar from '../Search';

const NavBar = () => {
    return ( 
        <div className="nav-bar">
            <Link to="/landing" className="nav-img">
                <img src={cityIcon} alt='Back to Home'/>                
            </Link>
            <h3>City Scope</h3>
            <SearchBar />
        </div>
     );
}
 
export default NavBar;