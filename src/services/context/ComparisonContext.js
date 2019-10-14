import React, { createContext, useState } from "react";

export const ComparisonContext = createContext();

const ComparisonContextProvider =  props => {
  const [comparison, setComparison] = useState({
    urbanScores: "",
    geoname_id: 0,
    cityImage: "",
    cityName: "",
    coord: {},
    match: false,
    closestCity: '',
    inDatabase: false
  });

  return (
    <ComparisonContext.Provider value={{ comparison, setComparison }}>
      {props.children}
    </ComparisonContext.Provider>
  );
};

export default ComparisonContextProvider;
