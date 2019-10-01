import React from 'react';

const Profession = ({job, display}) => {
    return <div className="job" onClick={() => display(job)}>{job}</div>;
}
 
export default Profession;