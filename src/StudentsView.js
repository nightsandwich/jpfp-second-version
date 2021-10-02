import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import StudentForm from "./StudentForm";
import Students from "./Students";
import { loadStudents } from "./store";
// import CampusDropdowns from "./CampusDropdowns";
import {Dialog, FormControl, MenuItem, InputLabel, Select, Button } from '@mui/material';


const StudentsView = () => {
    //mapState
    const students = useSelector(({students}) => students);

    //mapDispatch
    const dispatch = useDispatch(); 

    useEffect(() => {
        try{
            dispatch(loadStudents());
            
        }catch(ex){
            console.log(ex);
        }
    }, [students]); //componentDidMount
    
    //local state
    const [inputs, setInputs] = useState({ 
        view: 'normal',
        filter: 'all'
    })
    const {view, filter} = inputs;

    //sort and filter
    const chooseSortFilter = (ev) => {
        setInputs({...inputs, [ev.target.name]: ev.target.value});
    }
     
    const sortByName = (type) => [...students].sort((a,b) => (a[type] > b[type]) ? 1 : -1); 
    const sortedByGpa = [...students].sort((a,b) => (+a.gpa  < +b.gpa) ? 1 : (a.gpa * 1 === b.gpa * 1) ? ((a.firstName > b.firstName) ? 1: -1) : -1);
    const studentsToRender = view === 'normal' ? sortByName('firstName') : view === 'last' ? sortByName('lastName') : sortedByGpa;
    
    const filteredStudents = studentsToRender.filter(student => {
        return filter === 'all' ?
        student :
        filter === 'campuses' ?
        student.campusId :
        !student.campusId
    });
    
    //dialog
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = (ev) => {
        ev.preventDefault();
        setOpen(false);
    }
    
    return (
        
    <div>
        <h1>Students</h1><Button variant='contained' color='success' onClick={handleOpen}>Add New Student</Button>
            <FormControl sx={{m:1, minWidth: 120}} >
                <InputLabel>Sort</InputLabel>
                <Select
                    value={inputs.view}
                    label="Sort"
                    name='view'
                    onChange={chooseSortFilter}
                >
                    <MenuItem value={'normal'}>First Name</MenuItem>
                    <MenuItem value={'last'}>Last Name</MenuItem>
                    <MenuItem value={'gpa'}>GPA</MenuItem>
                </Select>
                </FormControl>
                <FormControl sx={{m:1, minWidth: 120}} >
                <InputLabel>Filter</InputLabel>
                <Select
                    value={inputs.filter}
                    label="Filter"
                    name='filter'
                    onChange={chooseSortFilter}
                >
                    <MenuItem value={'all'}>Show All</MenuItem>
                    <MenuItem value={'campuses'}>Enrolled</MenuItem>
                    <MenuItem value={'none'}>Unenrolled</MenuItem>
                </Select>
            </FormControl>

            <Dialog onClose={handleClose} open={open}>
                <StudentForm handleClose={handleClose} />
            </Dialog>
            <Students students={filteredStudents} />
    </div>

    );
}

export default StudentsView;


