import teleport from '../../../teleport';

export const getClimate = async urbanScores => {
            const city = urbanScores;

            let cityClimate, success, climateType, avgLow, avgHigh;
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

            const getClimateType = async cityClimate => {
              let checkType = cityClimate.data.find(
                x => x.id === "WEATHER-TYPE"
              );
              if (checkType) {
                return checkType.string_value;
              }
            };

            const getHighTemp = async cityClimate => {
              let checkHighTemp = cityClimate.data.find(
                x => x.id === "WEATHER-AVERAGE-HIGH"
              );

              if (checkHighTemp) {
                return checkHighTemp.string_value;
              } else {
                return;
              }
            };

            const getLowTemp = async cityClimate => {
              let checkLowTemp = cityClimate.data.find(
                x => x.id === "WEATHER-AVERAGE-LOW"
              );

              if (checkLowTemp) {
                return checkLowTemp.string_value;
              } else {
                return;
              }
            };

            cityClimate =  await checkForClimate(city);

            if (cityClimate) {
                
              climateType =  await getClimateType(cityClimate);
              avgLow =  await getLowTemp(cityClimate);
              avgHigh = await getHighTemp(cityClimate);

              success = true;

              climate = {
                  climateType,
                  avgHigh,
                  avgLow,
                  success
              }

              return climate;
            }

            else {
                climate = { 
                    climateType: "N/A",
                    avgHigh: "N/A",
                    avgLow: "N/A",
                    success: false
                }

                return climate;
            }
}