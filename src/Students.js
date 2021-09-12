import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddStudent from './AddStudent';
import { deleteStudent } from "./store";

const Students = ({students, campuses, destroy}) => {
    return (
        <>
        <div>
            <AddStudent />
        </div>
        <div>
            <h1>{students.length} Students</h1>
            <ul>
                {
                    students.map(student => {
                        return (
                            <li key={student.id}>
                                <Link to={`/students/${student.id}`}>{student.firstName}</Link> {student.campus ? `(attending ${student.campus.name})` : '(doing own thing)'}
                                {/* <Attending student={student} campuses={campuses}/> */}
                                <button onClick={()=>destroy(student.id)}>X</button>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    </>
    );
}
const mapDispatch = (dispatch, {history}) => {
    return {
        destroy: (id) => dispatch(deleteStudent(id, history))
    }
}
export default connect(({students, campuses})=>({students, campuses}), mapDispatch)(Students);

//{campuses.find(campus => campus.studentId === student.id)}