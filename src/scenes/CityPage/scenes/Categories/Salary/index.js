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
            <div className="salary-info">
                <h1>Salary</h1>
                <h2>{job}</h2>
                <p>25th Percentile: <span>${salaryDetails.low} USD</span></p>
                <p>50th Percentile: <span>${salaryDetails.avg} USD</span></p>
                <p>75th Percentile: <span>${salaryDetails.high} USD</span></p>
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