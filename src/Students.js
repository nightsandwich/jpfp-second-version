import React from "react";
import { connect } from "react-redux";
import AddStudent from './AddStudent';
import StudentList from "./StudentList";

const Students = ({students}) => {
//USE COMPONENT DID UPDATE HERE???? BC SCHOOL DOESN"T UPDATE
//the api is correct but it doesn't connect until reload

    return (
    <div>
        <h1> Students</h1>
        <div className='addContainer'>
            <StudentList students={students}/>
            <div>
                <AddStudent />
            </div>
        </div>
    </div>
    );
}


export default connect(({students, campuses})=>({students, campuses}))(Students);

