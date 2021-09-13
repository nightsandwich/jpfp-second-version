import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteStudent } from "./store";

const StudentList = ({students, destroy}) => {
 //   const attending = `<a href={`/campuses/${student.campus.id}`}>${student.campus.name}</a>`;
    return (
    <>
        <h1>{students.length} Students</h1>
        <ul>
                {
                    students.map(student => {
                        return (
                            <li key={student.id}>
                                <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link> {student.campus ? `(attending ${student.campus.name})` : '(doing own thing)'}
                                {/* <Attending student={student} campuses={campuses}/> */}
                                GPA: {student.gpa}
                                <button onClick={()=>destroy(student.id)}>X</button>
                            </li>
                        );
                    })
                }
            </ul>
    </>
    );
}
const mapDispatch = (dispatch, {history}) => {
    return {
        destroy: (id) => dispatch(deleteStudent(id, history))
    }
}
export default connect(null, mapDispatch)(StudentList)