import React from "react";
import { Link } from "react-router-dom";

const StudentList = ({students}) => {
 //   const attending = `<a href={`/campuses/${student.campus.id}`}>${student.campus.name}</a>`;
    return (
    <>
        <h1>{students.length} Students</h1>
        <ul>
            {
                students.map(student => {
                    return (
                        <li key={student.id}>
                            <Link to={`/students/${student.id}`}>{student.firstName}</Link> {student.campus ? `(attending ${student.campus.name})` : '(doing own thing)'}
                            {/* <Attending student={student} campuses={campuses}/> */}
                        </li>
                    );
                })
            }
        </ul>
    </>
    );
}

export default StudentList;