import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteStudent } from "./store";

const StudentList = ({students, destroy}) => {
 //   const attending = `<a href={`/campuses/${student.campus.id}`}>${student.campus.name}</a>`;
    return (
        <ul>
                {
                    students.map(student => {
                        return (
                            <li key={student.id}>
                                <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                                <button onClick={()=>destroy(student.id)}>X</button>
                                <br/> 
                                {student.campus ? ` (attending ${student.campus.name}) ` : ' (doing own thing) '}
                                GPA: {student.campus ?  student.gpa : ' N/A '} 
                            </li>
                        );
                    })
                }
        </ul>
    
    );
}
const mapDispatch = (dispatch, {history}) => {
    return {
        destroy: (id) => dispatch(deleteStudent(id, history))
    }
}
export default connect(null, mapDispatch)(StudentList)