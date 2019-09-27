import '../styles.css'

import React, { useState, useEffect } from 'react';

import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryVoronoiContainer,
  VictoryScatter
} from "victory";
import { formatData } from '../utils/chartData';
import {fetchGlobalSafety} from '../../../../../../services/api/components/categories/Safety'

const Graph = () => {

    const [dataPoints, setDataPoints] = useState([])

    useEffect(() => {
        (async function () {
            setDataPoints(await formatData(await fetchGlobalSafety()));
        })()
    }, [])

    if(dataPoints.length) {
        return (
          <div>
            <h2>Compared To...</h2>
            <VictoryChart
              containerComponent={
                <VictoryVoronoiContainer labels={({datum}) => `${datum.name}`} />
              }
            >
              <VictoryAxis
                dependentAxis
                orientation="left"
                tickValues={[10, 20, 30, 40, 50]}
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
                tickFormat={["Few Guns", "", "", "Many Guns"]}
              />
              <VictoryGroup>
                <VictoryScatter
                  style={{
                    data: { fill: "1E222F" }
                  }}
                  data={dataPoints}
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