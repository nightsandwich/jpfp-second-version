import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Student = ({student, campus}) => {
    
    return (
    <>
        <h1>{student.firstName} {student.lastName}</h1>
        <img src={student.imageUrl} alt={`Photo of ${student.firstName}`}/>
        <h3>{student.email}</h3>
        <p>{student.gpa}</p>
        <div>
            <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
        </div>
        
    </>
    );
}
const mapState = (state, otherProps) => {
    const student = state.students.find(student => student.id === otherProps.match.params.id * 1) || {};
    const campus = state.campuses.find(campus => campus.id === student.campusId * 1) || {};
    return {student, campus};
}
export default connect(mapState)(Student);