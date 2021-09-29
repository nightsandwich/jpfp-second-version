import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CampusForm from "./CampusForm";
import { deleteCampus, loadCampuses } from "./store";

const Campuses = ({location, match}) => {
    //mapState
    const campuses = useSelector(({campuses}) => campuses);
    //mapDispatch
    const dispatch = useDispatch(); 
    
    useEffect(() => dispatch(loadCampuses()), []); //componentDidMount
    
    
    // //pagination
    const start = 10 * (location.search.slice(6) - 1) + 1;
    const end = start + 9;
    
    //local state
    const [inputs, setInputs] = useState({ 
        view: 'normal',
        filter: 'all'
    })
    
    
    //sort and filter
    const chooseSortFilter = (ev) => {
        setInputs({...inputs, [ev.target.name]: ev.target.value});
    }
     
    const sortedByName = [...campuses].sort((a,b) => (a.name > b.name) ? 1 : -1); 
    const sortedByStudents = [...campuses].sort((a,b) => (a.students.length < b.students.length) ? 1 : (a.students.length === b.students.length) ? ((a.name > b.name) ? 1: -1) : -1);
    const sortedByState = [...campuses].sort((a,b) => (a.address.split(', ').slice(2,3).join('').split(' (')[0] > b.address.split(', ').slice(2,3).join('').split(' (')[0]) ? 1 : -1);
    const campusesToRender = inputs.view === 'normal' ? sortedByName : inputs.view === 'students' ? sortedByStudents : sortedByState;
    
    const filteredCampuses = campusesToRender.filter(campus => {
        return inputs.filter === 'all' ? 
        campus : 
        inputs.filter === 'students' ?
        campus.students.length :
        !campus.students.length
    });
    const paginatedCampuses = filteredCampuses.filter((campus,idx) => idx + 1 >= start && idx + 1 <= end ? campus : '');
    
    return (
    <div>
        <h1>Campuses</h1>
        <div>
            Sort by:
            <select name='view' value={inputs.view} onChange={chooseSortFilter} >
                <option value={'normal'}>Name</option>
                <option value={'students'}>Number of Students</option>
                <option value={'states'}>State</option>
            </select>
        </div>
        <div>
            Filter by: 
            <select disabled={start !== 1} name='filter' value={inputs.filter} onChange={chooseSortFilter} >
                <option value={'all'}>Show All</option>
                <option value={'students'}>Campuses With Students</option>
                <option value={'none'}>Campuses Without Students</option>
            </select>
        </div>
        
        <div className='addContainer'>
            <ul>
                {
                    paginatedCampuses.map(campus => {
                        return (
                            <li key={campus.id}>
                                <button onClick={()=>dispatch(deleteCampus(campus.id))}><small>DELETE</small></button><span> </span>
                                <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                                <small>  ({campus.address.split(', ').slice(2,3).join('').split(' (')[0]})</small>
                                <div className='count'>
                                {campus.students.length === 0 ? '--No students--' : campus.students.length === 1 ? '--1 student--' : `--${campus.students.length} students--`}
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
            <div>
                <CampusForm action={'add'} match={match} />
            </div>
        </div>
        <div className='pagnav'>
            Campuses 
            {
                filteredCampuses.map((campus, idx) => {
                    return (((idx + 1) % 10 === 1) ? 
                    <Link key={campus.id} to={`campuses?page=${(idx + 10) / 10}`}> {`<${idx + 1}>`} </Link>
                    : '');
                })
            } 
            <small className='nums' ><b>({start} to {end} of {campuses.length})</b></small>
        </div>
        
    </div>

    );
}

export default Campuses;


