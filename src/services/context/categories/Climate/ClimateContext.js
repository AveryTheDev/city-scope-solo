import React, { createContext, useState } from "react";

export const ClimateContext = createContext();

const ClimateContextProvider = props => {
  const [climate, setClimate] = useState({
    climateType: "",
    avgHigh: "",
    avgLow: "",
    tempSystem: "",
    success: false
  });

  const setMetric = (tempSystem, avgHigh, avgLow) => {
    let system = tempSystem;
    let high = parseFloat(avgHigh);
    let low = parseFloat(avgLow);

    const toFahrenheit = temp => {
      let convertedTemp = ((temp * 9) / 5 + 32).toPrecision(2);
      return convertedTemp;
    };

    const toCelsius = temp => {
      let convertedTemp = (((temp - 32) * 5) / 9).toPrecision(2);
      return convertedTemp;
    };

    if (tempSystem === "C°") {
      high = toFahrenheit(high);
      low = toFahrenheit(low);
      system = "F°";

      return setClimate({
        ...climate,
        [avgHigh]: high,
        [avgLow]: low,
        [tempSystem]: system
      });

    } else {
      high = toCelsius(high);
      low = toCelsius(low);
      system = "C°";

      return setClimate({
        ...climate,
        [avgHigh]: high,
        [avgLow]: low,
        [tempSystem]: system
      });
    }
  };

  return <ClimateContextProvider values={{setMetric, climate, setClimate}}>{props.children}</ClimateContextProvider>;
};

export default ClimateContextProvider;
