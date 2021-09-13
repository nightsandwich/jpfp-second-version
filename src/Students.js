import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddStudent from './AddStudent';
import { deleteStudent } from "./store";
import StudentList from "./StudentList";

const filter = (name, users) => {
    return () => {
        if(name === 'noschool') return users.filter(user => !user.campusId);
        else return users.filter(user => user.campusId)
    }
}
const Students = ({students, campuses, destroy}) => {
//USE COMPONENT DID UPDATE HERE???? BC SCHOOL DOESN"T UPDATE
//the api is correct but it doesn't connect until reload

    return (
        <>

        <div className='addstudent'>
            <AddStudent />
        </div>
        <div className='students'>
            <StudentList students={students}/>
        </div>
    </>
    );
}
const mapState = ({users}) => {
    return 
}
const mapDispatch = (dispatch, {history}) => {
    return {
        destroy: (id) => dispatch(deleteStudent(id, history))
    }
}
export default connect(({students, campuses})=>({students, campuses}), mapDispatch)(Students);

//{campuses.find(campus => campus.studentId === student.id)}