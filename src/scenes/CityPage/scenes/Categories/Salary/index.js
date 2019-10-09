import "./styles.css";

import React, { useState, useEffect, useContext, useRef } from "react";
import { ChosenCityContext } from "../../../../../services/context/ChosenCityContext";
import { fetchProfessions, onProfessionSelect } from "../../../../../services/api/components/categories/Salary";
import Profession from "./Profession";
import { ComparisonContext } from "../../../../../services/context/ComparisonContext";

const Salary = ({ secondCity }) => {
  const [professions, setProfessions] = useState([]);
  const [selectedJob, setSelectedJob] = useState("Accountant");
  const [salaryDetails, setSalaryDetails] = useState({
    low: "",
    avg: "",
    high: ""
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const { chosenCity } = useContext(ChosenCityContext);
  const { comparison } = useContext(ComparisonContext);

  const salaryButton = useRef();

  useEffect(() => {
    const city = secondCity ? comparison : chosenCity;
    (async function() {
      setProfessions(await fetchProfessions(city.urbanScores));
      setSalaryDetails(
        await onProfessionSelect(city.urbanScores, selectedJob)
      );
    })();
  }, [chosenCity, comparison, secondCity, selectedJob]);

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
    } else {
      setMenuOpen(false);
    }
  };

  const getWages = job => {
    const profession = job;

    const getWagesForJob = async profession => {
      setSalaryDetails(
        await onProfessionSelect(chosenCity.urbanScores, profession)
      );
    };

    setSelectedJob(profession);
    getWagesForJob(profession);
    setMenuOpen(false);
  };

  const job = selectedJob ? selectedJob : "Accountant";
  let jobList;

  if (professions.length) {
    jobList = professions.map((profession, index) => {
      return (
        <Profession
          job={profession}
          key={professions + index}
          display={getWages}
        />
      );
    });
  }

  if (menuOpen) {
    return (
      <div className="salary-info">
        <h1>Salaries</h1>
        <div ref={salaryButton} className="salary-dropdown">
          <button
            className="salary-button"
            onClick={e => setMenuOpen(!menuOpen)}
          >
            Select A Profession
          </button>
          <div className="salary-dropdown-content">{jobList}</div>
        </div>
        <h2>{job}</h2>
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

  return (
    <div className="salary-info">
      <h1>Salaries</h1>
      <button
        className="salary-button"
        ref={salaryButton}
        onClick={e => setMenuOpen(!menuOpen)}
      >
        Select A Profession
      </button>
      <h2>{job}</h2>
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
};
 
export default Salary;