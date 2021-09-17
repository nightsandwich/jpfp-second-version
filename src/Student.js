import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {deleteStudentSchool} from './store';

const Student = ({student, campus, dropSchool}) => {
    
        return (
        <div className='infocontainer student'>
            <div className='studentname'>
                <h2>{student.firstName} {student.lastName}</h2>
            </div>
            <div>
                <small>{student.email}</small>
            </div>
            <div>
                <img src={student.imageUrl} alt={`Photo of ${student.firstName}`}/>
            </div>
            <div>
                {campus.id ? `GPA: ${student.gpa}` : '' }
            </div>
            <div>
                {campus.id ? <Link to={`/campuses/${campus.id}`}>{campus.name}</Link> : 'Not enrolled in a school.' }
                {campus.id ? <button onClick={()=>dropSchool(student)}>Unenroll</button> : '' }
            </div>
        </div>
        );
    
}
const mapState = (state, otherProps) => {
    const student = state.students.find(student => student.id === otherProps.match.params.id * 1) || {};
    const campus = state.campuses.find(campus => campus.id === student.campusId * 1) || {};
    return {student, campus};
}
const mapDispatch = dispatch => {
    return {
        dropSchool: (student) => dispatch(deleteStudentSchool(student))
    }
}
export default connect(mapState, mapDispatch)(Student);