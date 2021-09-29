import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StudentForm from './StudentForm';
import {loadStudents, deleteStudent} from './store';

const Students = ({location, match}) => {
    //mapState
    const students = useSelector(({students}) => students);
    //mapDispatch
    const dispatch = useDispatch(); 
    
    useEffect(() => dispatch(loadStudents()), []); //componentDidMount
    
    //pagination
    const start = 10 * (location.search.slice(6) - 1) + 1;
    const end = start + 9;
    
    //local state
    const [inputs, setInputs] = useState({
        view: 'normal',
        filter: 'all'
    });
    const {view, filter} = inputs;

    //sort and filter
    const chooseSortFilter = (ev) => {
        setInputs({...inputs, [ev.target.name]: ev.target.value});
    }
    
    const sortedByFirst = [...students].sort((a,b) => (a.firstName > b.firstName) ? 1 : -1); 
    const sortedByLast = [...students].sort((a,b) => (a.lastName > b.lastName) ? 1 : -1);
    const sortedByGpa = [...students].sort((a,b) => (a.gpa * 1 < b.gpa * 1) ? 1 : (a.gpa * 1 === b.gpa * 1) ? ((a.firstName > b.firstName) ? 1: -1) : -1);
    const studentsToRender = view === 'normal' ? sortedByFirst : view === 'last' ? sortedByLast : sortedByGpa;
    
    const filteredStudents = studentsToRender.filter(student => {
        return filter === 'all' ?
        student :
        filter === 'campuses' ?
        student.campusId :
        !student.campusId
    });
    const paginatedStudents = filteredStudents.filter((student, idx) => idx + 1 >= start && idx + 1 <= end ? student : '');
    
    return (
    <div>
        <h1> Students</h1>
        <div>
            Sort by:
            <select name='view' value={view} onChange={chooseSortFilter}>
                <option value={'normal'}>First Name</option>
                <option value={'last'}>Last Name</option>
                <option value={'gpa'}>Highest GPA</option>
            </select>
        </div>
        <div>
            Filter by: 
            <select disabled={start !== 1} name='filter' value={filter} onChange={chooseSortFilter} >
                <option value={'all'}>Show All</option>
                <option value={'campuses'}>Students With Campus Enrollment</option>
                <option value={'none'}>Students Without Campus Enrollment</option>
            </select>
        </div>
        
        <div className='addContainer'>
            <ul>
                {
                    paginatedStudents.map(student => {
                        return (
                            <li key={student.id}>
                                <button onClick={()=>dispatch(deleteStudent(student.id))}><small>DELETE</small></button><span> </span>
                                <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                                <small>  (GPA: {student.campus ?  student.gpa : 'N/A'}) </small>
                                <br/> 
                                {student.campus ? `--attending ${student.campus.name}--` : '--not enrolled--'}
                            </li>
                        );
                    })
                }
            </ul>
            <div>
                <StudentForm match={match} action={'add'}/>
            </div>
        </div>
        <div className='pagnav'>
            Students
            {
                filteredStudents.map((student, idx) => {
                    return (((idx + 1) % 10 === 1) ? 
                    <Link key={student.id} to={`students?page=${(idx + 10) / 10}`}> {`<${idx + 1}>`} </Link>
                    : '');
                })
            }
            <small className='nums' ><b>({start} to {end} of {students.length})</b></small>
        </div>
    </div>
    );
}

export default Students;

