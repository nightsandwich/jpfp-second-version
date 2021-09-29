import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {updateStudent} from './store';
import StudentForm from "./StudentForm";
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const Student = ({match}) => {
    let history = useHistory();
    const dispatch = useDispatch();

    const student = useSelector(state => state.students.find(student => student.id === +match.params.id) || {});
    const campus = useSelector(state => state.campuses.find(campus => campus.id === student.campusId) || {});
    const onClick = () => {
        dispatch(updateStudent({...student, campusId: null}));
        history.push(`/campuses/${campus.id}`);
    }
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
                    {campus.id ? <Button variant='contained' color='error' onClick={onClick}>Unenroll</Button> : ''}
                </div>
            </div>
            <div className='edit'>
                <StudentForm action={'update'} studentId={student.id} />
            </div>
        </div>
        );
    
}

export default Student;