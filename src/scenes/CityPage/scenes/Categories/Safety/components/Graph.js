import '../styles.css'

import React, { useState, useEffect, useContext } from 'react';
import {ChosenCityContext} from '../../../../../../services/context/ChosenCityContext';

import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryVoronoiContainer,
  VictoryScatter
} from "victory";

import { formatData, fetchCitySafety } from '../utils';
import {fetchGlobalSafety} from '../../../../../../services/api/components/categories/Safety'

const Graph = () => {
    const [dataPoints, setDataPoints] = useState([]);
    const [cityStats, setCityStats] = useState({
      guns: 0,
      deaths: 0
    })

    const { chosenCity } = useContext(ChosenCityContext);

    useEffect(() => {
        (async function () {
            setDataPoints(await formatData(await fetchGlobalSafety()));
            setCityStats(await fetchCitySafety(chosenCity.urbanScores));
        })()
    }, [chosenCity.urbanScores])

    if(dataPoints.length) {
        return (
          <div className="graph">
            <p>Guns per 100 Residents: <span>{cityStats.guns}</span></p>
            <p>Deaths per 100,000 Residents: <span>{cityStats.deaths}</span></p>
            <h2>Compared To...</h2>
            <VictoryChart
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) => `${datum.name}`}
                />
              }
            >
              <VictoryAxis
                dependentAxis
                orientation="left"
                tickValues={[10, 20, 30, 40, 50]}
                style={{
                  tickLabels: {fontFamily: "Oswald"}
                }}
                tickFormat={[
                  `Low 
                                    Crime`,
                  "",
                  "",
                  "",
                  `High 
                                    Crime`
                ]}
              />
              <VictoryAxis
                tickValues={[100, 200, 300, 400]}
                style={{
                  tickLabels: {fontFamily: "Oswald"}
                }}
                tickFormat={["Few Guns", "", "", "Many Guns"]}
              />
              <VictoryGroup>
                <VictoryScatter
                  style={{
                    data: { fill: "1E222F" },
                    labels: { fontFamily: "Oswald" }
                  }}
                  data={dataPoints}
                />
                <VictoryScatter
                  style={{
                    data: {
                      fill: "#17A2B8",
                      stroke: "#72e9fc",
                      strokeWidth: 3
                    },
                    labels: { fontFamily: "Oswald" }
                  }}
                  size={10}
                  data={[
                    {
                      x: cityStats.guns,
                      y: cityStats.deaths,
                      name: "(selected)"
                    }
                  ]}
                />
              </VictoryGroup>
            </VictoryChart>
          </div>
        );
    }
    return ( 
    <div>
        Graph
    </div> );
}
 
export default Graph;