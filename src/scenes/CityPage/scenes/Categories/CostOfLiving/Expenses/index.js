import "./styles.css";

import React, { useState, useEffect, useContext } from "react";
import { ChosenCityContext } from "../../../../../../services/context/ChosenCityContext";
import { fetchExpenses } from "../../../../../../services/api/components/categories/Expenses";

const Expenses = () => {
    const { chosenCity } = useContext(ChosenCityContext);
    const [expenses, setExpenses] = useState([]);

    useEffect (() => {
        (async function () {
            setExpenses(await fetchExpenses(chosenCity.urbanScores))
        })();
    }, [chosenCity.urbanScores])

    if(expenses.length > 0) {
        let results = expenses.map(x => (
          <p key={x.item + x.cost} className="expenses">
            Cost of {x.item}: ${x.cost} USD
          </p>
        ));

        return (
            <>
                <h2>Expenses</h2>
                {results}
            </>
        )
    }

    return ( 
        <div>
            Expenses
        </div>
     );
}
 
export default Expenses;