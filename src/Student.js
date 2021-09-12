import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UpdateStudent from "./UpdateStudent";

const Student = ({student, campus}) => {
    
    return (
    <>
        <h1>{student.firstName}</h1>
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
    console.log(student);
    const campus = state.campuses.filter(campus => campus.id === student.id * 1)[0] || {};
    console.log(campus);
    return {student, campus};
}
export default connect(mapState)(Student);