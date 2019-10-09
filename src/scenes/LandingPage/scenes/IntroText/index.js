import React from 'react';

import SearchBar from '../../../../components/Search'

import './styles.css';

const IntroText = () => {
    return (
      <div className="intro-text">
        <h1>City Scope</h1>
        <p>
          <span className="emphasis">"Explore the globe with one click."</span>
        </p>
        <p>
          With living info on 265 cities, you’ll be hard pressed to find a place
          with more relevant info to prospective movers.
          <br />
          <br />
          Search your dream destination below to see if it measures up to the
          needs of your reality.
        </p>
        <br />
        <SearchBar />
        <p>
          Not quite sure where to move yet? Check out one of our 265 cities
          below!
        </p>
      </div>
    );
}
 
export default IntroText;