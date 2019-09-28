import "./styles.css";

import React, { useState, useEffect, useContext, useRef } from "react";
import { ChosenCityContext } from "../../../../../services/context/ChosenCityContext";
import { fetchProfessions, onProfessionSelect } from "../../../../../services/api/components/categories/Salary";

const Salary = () => {

    const [ professions, setProfessions ] = useState([]);
    const [selectedJob, setSelectedJob] = useState('');
    const [ salaryDetails, setSalaryDetails] = useState({
        low: '',
        avg: '',
        high: ''
    })

    const [menuOpen, setMenuOpen] = useState(false);
    const { chosenCity } = useContext(ChosenCityContext);
    const salaryButton = useRef();

    useEffect (() => {
        (async function () {
            setProfessions(await fetchProfessions(chosenCity.urbanScores));
            setSalaryDetails(await onProfessionSelect(chosenCity.urbanScores));
        })();
    }, [professions, chosenCity.urbanScores])

    useEffect(() => {
    if (menuOpen) {
        document.addEventListener("mousedown", handleClick);
    } else {
        document.removeEventListener("mousedown", handleClick);
    }

    return () => {
        document.removeEventListener("mousedown", handleClick);
    };
    }, [menuOpen]);

    const handleClick = e => {
        if (salaryButton.current.contains(e.target)) {
        return;
        } 
        else {
        setMenuOpen(false);
        }
    };

    if(salaryDetails) {
        // const professionOptions = professions.map(x => <p key={x}>{x}</p>);
        
        const job = selectedJob ? selectedJob : "Accountant";
        
        return (
            <div>
                <h1>Salary</h1>
                <p>{job}</p>
                <p>25th Percentile: ${salaryDetails.low} USD</p>
                <p>50th Percentile: ${salaryDetails.avg} USD</p>
                <p>75th Percentile: ${salaryDetails.high} USD</p>
            </div>
        )
    }

    return ( 
        <div>
            Salary
        </div>
     );
}
 
export default Salary;