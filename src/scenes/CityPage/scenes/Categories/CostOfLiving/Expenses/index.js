import "./styles.css";

import React, { useState, useEffect, useContext } from "react";
import { ChosenCityContext } from "../../../../../../services/context/ChosenCityContext";
import { fetchExpenses } from "../../../../../../services/api/components/categories/Expenses";
import { ComparisonContext } from "../../../../../../services/context/ComparisonContext";

const Expenses = ({ secondCity }) => {
  const { chosenCity } = useContext(ChosenCityContext);
  const { comparison } = useContext(ComparisonContext);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const city = secondCity ? comparison : chosenCity;
    (async function() {
      setExpenses(await fetchExpenses(city.urbanScores));
    })();
  }, [chosenCity, comparison, secondCity]);

  if (expenses.length > 0) {
    let results = expenses.map(x => (
      <p key={x.item + x.cost} className="expenses">
        Cost of {x.item}: <span>${x.cost} USD</span>
      </p>
    ));

    return (
      <>
        <h2>Expenses</h2>
        {results}
      </>
    );
  }

  return <div></div>;
};
 
export default Expenses;