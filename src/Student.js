import React, {useEffect} from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateStudent } from "./store";

const Student = ({student, campus}) => {
    
    const dispatch = useDispatch();

    if (!student.id){
        return('...loading student');
    }
        return (
        <div className='infocontainer student'>
            <div className='studentname'>
                <h2>{student.firstName} {student.lastName}</h2>
            </div>
            <div>
                <img src={student.imageUrl} alt={`Photo of ${student.firstName}`}/>
            </div>
            <div>
                <small>{student.email}</small>
            </div>
            <div>
                {campus.id ? `GPA: ${student.gpa}` : '' }
            </div>
            <div>
                {campus.id ? <Link to={`/campuses/${campus.id}`}>{campus.name}</Link> : 'Not enrolled in a school.' }
                {campus.id ? <button onClick={() => dispatch(updateStudent({...student, campusId: null}))}>Unenroll</button> : ''}
            </div>
        </div>
        );
    
}
const mapState = (state, otherProps) => {
    const student = state.students.find(student => student.id === otherProps.match.params.id * 1) || {};
    const campus = state.campuses.find(campus => campus.id === student.campusId * 1) || {};
    //const campus = student.campus || {};
    const campuses = state.campuses;
    return {student, campus};
}

export default connect(mapState)(Student);