import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {updateStudent} from './store';
import StudentForm from "./StudentForm";

const Student = ({match}) => {
    const dispatch = useDispatch();

    const student = useSelector(state => state.students.find(student => student.id === +match.params.id) || {});
    const campus = useSelector(state => state.campuses.find(campus => campus.id === student.campusId) || {});

    if (!student.id){
        return('...loading student');
    }
        return (
        <div className = 'addContainer'>
            <div className='infocontainer student'>
                <div className='studentname'>
                    <h2>{student.firstName} {student.lastName}</h2>
                </div>
                <div>
                    <img src={student.imageUrl} alt={`Photo of ${student.firstName}`}/>
                </div>
                <div>
                    <small>{student.email}</small>
                </div>
                <div>
                    {campus.id ? `GPA: ${student.gpa}` : '' }
                </div>
                <div>
                    {campus.id ? <Link to={`/campuses/${campus.id}`}>{campus.name}</Link> : 'Not enrolled in a school.' }
                    {campus.id ? <button onClick={() => dispatch(updateStudent({...student, campusId: null}))}>Unenroll</button> : ''}
                </div>
            </div>
            <div className='edit'>
                <StudentForm action={'update'} studentId={student.id} />
            </div>
        </div>
        );
    
}

export default Student;