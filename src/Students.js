import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Students = ({students}) => {
    return (
        <>
        <h1>Students</h1>
        <ul>
            {
                students.map(student => {
                    return (
                        <li key={student.id}>
                            <Link to={`/students/${student.id}`}>{student.firstName}</Link> {student.campus ? `(attending ${student.campus.name})` : '(doing own thing)'}
{/* ------ADD LINK TO SCHOOL */}
                        </li>
                    );
                })
            }
        </ul>
    </>
    );
}

export default connect(state=>state)(Students);