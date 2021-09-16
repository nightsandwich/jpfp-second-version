import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddStudent from './AddStudent';
import { deleteStudent } from "./store";
import StudentList from "./StudentList";

const Students = ({students}) => {
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


export default connect(({students, campuses})=>({students, campuses}))(Students);

