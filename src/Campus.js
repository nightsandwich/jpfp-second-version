import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CampusForm from "./CampusForm";

const Campus = ({match}) => {
   const campus = useSelector(state => state.campuses.find(campus => campus.id === +match.params.id) || {})
   const students = useSelector(state => state.students.filter(student => student.campusId === campus.id) || []);

   if (!campus.id){
       return '...loading campus';
   } 
   
    return (
    <div className = 'addContainer'>
    <div className='infocontainer'>
        <h1>{campus.name}</h1>
        <div>
            <img src={campus.imageUrl} alt={`Photo of ${campus.name}`}/>
        </div>
        <div className='description'>
            <strong>About:</strong>
            <br/>
            {campus.description}
            <br/>
        </div>
        <small><i>({campus.address})</i></small>
        {students.length === 1 ? <h3 className='studentsheading'>{students.length} Student Currently Enrolled</h3> : students.length > 1 ? <h3 className='studentsheading'>{students. length} Students Currently Enrolled</h3> : <h4 className='studentsheading'>(No students currently enrolled.)</h4>}
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
    <div className='edit'>
        <CampusForm action={'update'} campusId={campus.id} />
    </div>
    </div>
    );
}

export default Campus;