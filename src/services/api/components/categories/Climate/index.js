import teleport from '../../../teleport';

export const getClimate = async urbanScores => {
    const city = urbanScores;

            let cityClimate, success, tempSystem, climateType, avgLow, avgHigh;
            let climate = {};

            const checkForClimate = async city => {
                const cityDetails = await teleport.get(city);
                let cityClimate = await teleport.get(
                cityDetails.data["_links"]["ua:details"]["href"]
                );

                cityClimate = cityClimate.data.categories.find(
                category => category.id.toUpperCase() === "CLIMATE"
                );

                return cityClimate;
            }

            const getClimateType = cityClimate => {
              let checkType = cityClimate.data.find(
                x => x.id === "WEATHER-TYPE"
              );
              if (checkType) {
                return checkType.string_value;
              }
            };

            const getHighTemp = cityClimate => {
              let checkHighTemp = cityClimate.data.find(
                x => x.id === "WEATHER-AVERAGE-HIGH"
              );

              if (checkHighTemp) {
                return checkHighTemp.string_value;
              } else {
                return;
              }
            };

            const getLowTemp = cityClimate => {
              let checkLowTemp = cityClimate.data.find(
                x => x.id === "WEATHER-AVERAGE-LOW"
              );

              if (checkLowTemp) {
                return checkLowTemp.string_value;
              } else {
                return;
              }
            };

            cityClimate = (async function () { await checkForClimate(city)})();

            if (cityClimate) {
                
              climateType = (async function() { await getClimateType(cityClimate)})();
              avgLow = (async function() { await getLowTemp(cityClimate)})();
              avgHigh = (async function() {await getHighTemp(cityClimate)})();

              success = true;
              tempSystem = "metric";

              climate = {
                  climateType,
                  avgHigh,
                  avgLow,
                  tempSystem,
                  success
              }

              return climate;
            }

            else {
                climate = { 
                    climateType: "N/A",
                    avgHigh: "N/A",
                    avgLow: "N/A",
                    tempSystem: "",
                    success: false
                }

                return climate;
            }
}