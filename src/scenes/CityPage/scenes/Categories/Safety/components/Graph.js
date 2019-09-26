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

    return ( 
    <div>
        Graph
    </div> );
}
 
export default Graph;