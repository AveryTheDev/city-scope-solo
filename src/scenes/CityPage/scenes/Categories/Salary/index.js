import "./styles.css";

import React, { useState, useEffect, useContext, useRef } from "react";
import { ChosenCityContext } from "../../../../../services/context/ChosenCityContext";
import { fetchProfessions, onProfessionSelect } from "../../../../../services/api/components/categories/Salary";
import Profession from "./Profession";

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
    }, [chosenCity.urbanScores])

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

    const getWages = job => {
        const profession = job;
        
        const getWagesForJob = async profession => {
        setSalaryDetails(await onProfessionSelect(chosenCity.urbanScores, profession));
        }

        setSelectedJob(profession);
        getWagesForJob(profession)
        setMenuOpen(false);
    }

    const job = selectedJob ? selectedJob : "Accountant";
    let jobList;

    if(professions.length){
        jobList = professions.map((profession, index) => {
            return <Profession job={profession} key={professions+index} display={getWages}/>
        })
    }

    if(menuOpen) {                
        return (
            <div className="salary-info">
                <div className="salary-top-row">
                    <h1>Salary</h1>
                    <div ref={salaryButton} className="salary-dropdown">
                        <button className="salary-button" onClick = {e => setMenuOpen(!menuOpen)}>
                            {job}
                        </button> 
                    <div className="salary-dropdown-content">
                            {jobList}                        
                        </div>
                    </div>

                </div>
                <div className="job-">

                </div>
                <h2>{job}</h2>
                <p>25th Percentile: <span>${salaryDetails.low} USD</span></p>
                <p>50th Percentile: <span>${salaryDetails.avg} USD</span></p>
                <p>75th Percentile: <span>${salaryDetails.high} USD</span></p>
            </div>
        )
    }

    return (
      <div className="salary-info">
        <div className="salary-top-row">
          <h1>Salary</h1>
          <button
            className="salary-button"
            ref={salaryButton}
            onClick={e => setMenuOpen(!menuOpen)}
          >
            {job}
          </button>
        </div>
        <p>
          25th Percentile: <span>${salaryDetails.low} USD</span>
        </p>
        <p>
          50th Percentile: <span>${salaryDetails.avg} USD</span>
        </p>
        <p>
          75th Percentile: <span>${salaryDetails.high} USD</span>
        </p>
      </div>
    );
}
 
export default Salary;