import React from 'react';

const Profession = ({job, display}) => {
    return <div onClick={() => display(job)}>{job}</div>;
}
 
export default Profession;