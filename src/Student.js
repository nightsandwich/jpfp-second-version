import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Student = ({student, campus}) => {
    
    return (
    <div className='infocontainer'>
        <h1>{student.firstName} {student.lastName}</h1>
        <div>
            <img src={student.imageUrl} alt={`Photo of ${student.firstName}`}/>
        </div>
        <div>
            {campus.id ? `GPA: ${student.gpa} at ` : '' }
            {campus.id ? <Link to={`/campuses/${campus.id}`}>{campus.name}</Link> : 'Not enrolled in a school.' }
        </div>
        <div>
            Email: {student.email}
        </div>
        
    </div>
    );
}
const mapState = (state, otherProps) => {
    const student = state.students.find(student => student.id === otherProps.match.params.id * 1) || {};
    const campus = state.campuses.find(campus => campus.id === student.campusId * 1) || {};
    return {student, campus};
}
export default connect(mapState)(Student);