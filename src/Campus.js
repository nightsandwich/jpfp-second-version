import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Campus = ({campus, students}) => {
    
    return (
    <div className='infocontainer'>
        <h1>{campus.name}</h1>
        <div>
            <img src={campus.imageUrl} alt={`Photo of ${campus.name}`}/>
        </div>
        <div className='description'>
            {campus.description}
            <br/>
            <small><i>({campus.address})</i></small>
        </div>
        {students.length ? <h3 className='studentsheading'>{students. length} Students Enrolled</h3> : <h4 className='studentsheading'>No students.</h4>}
        <ul>
                {
                    students.map(student => {
                        return (
                            <li key={student.id}>
                                <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                            </li>
                        );
                    })
                }
        </ul>
        
    </div>
    );
}
const mapState = (state, otherProps) => {
    const campus = state.campuses.find(campus => campus.id === otherProps.match.params.id * 1) || {};
    const students = state.students.filter(student => student.campusId === campus.id) || [];
    return {campus, students};
}
export default connect(mapState)(Campus);