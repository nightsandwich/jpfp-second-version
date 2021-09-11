import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddStudent from './AddStudent';
import StudentList from "./StudentList";

const Students = ({students}) => {
    return (
        <>
        <div>
            <AddStudent />
        </div>
        <StudentList students={students}/>
    </>
    );
}

export default connect(state=>state)(Students);