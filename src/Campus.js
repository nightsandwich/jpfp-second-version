import React from "react";
import { connect } from "react-redux";
import StudentList from "./StudentList";
import { Link } from "react-router-dom";

const Campus = ({campus, students}) => {
    
    return (
    <>
        <h1>{campus.name}</h1>
        <img src={campus.imageUrl} alt={`Photo of ${campus.name}`}/>
        <h3>{campus.address}</h3>
        <p>{campus.description}</p>
        <div>
            <h1>{students.length} Students</h1>
            <ul>
                {
                    students.map(student => {
                        return (
                            <li key={student.id}>
                                <Link to={`/students/${student.id}`}>{student.firstName}</Link> 
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    </>
    );
}
const mapState = (state, otherProps) => {
    const campus = state.campuses.find(campus => campus.id === otherProps.match.params.id * 1) || {};
    const students = state.students.filter(student => student.campusId === campus.id) || [];
    return {campus, students};
}
export default connect(mapState)(Campus);