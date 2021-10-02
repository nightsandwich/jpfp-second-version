import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CampusForm from "./CampusForm";
import Campuses from "./Campuses";
import { loadCampuses } from "./store";
// import CampusDropdowns from "./CampusDropdowns";
import {Dialog, FormControl, MenuItem, InputLabel, Select, Button } from '@mui/material';


const CampusesView = () => {
    //mapDispatch
    const dispatch = useDispatch(); 
    const [loading, setLoading] = useState(false);

    //mapState
    const campuses = useSelector(({campuses}) => campuses);
    //why won't this load the campuses without useEffect ??
    //what's the difference of loading the store via the state vs reloading?
        
    useEffect(() => {
        try{
            dispatch(loadCampuses());
            setLoading(true);
            
        }catch(ex){
            console.log(ex);
        }
    }, []); //componentDidMount
    
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
    const campusesToRender = inputs.view === 'normal' ? sortedByName : inputs.view === 'students' ? sortedByStudents : '';
    
    const filteredCampuses = campusesToRender.filter(campus => {
        return inputs.filter === 'all' ? 
        campus : 
        inputs.filter === 'students' ?
        campus.students.length :
        !campus.students.length
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
    if (loading) return (
        
    <div>
        <h1>Campuses</h1><Button variant='contained' color='success' onClick={handleOpen}>Add New Campus</Button>
            <FormControl sx={{m:1, minWidth: 120}} >
                <InputLabel>Sort</InputLabel>
                <Select
                    value={inputs.view}
                    label="Sort"
                    name='view'
                    onChange={chooseSortFilter}
                >
                    <MenuItem value={'normal'}>Name</MenuItem>
                    <MenuItem value={'students'}>Number of Students</MenuItem>
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
                    <MenuItem value={'none'}>Campuses Without Students</MenuItem>
                    <MenuItem value={'students'}>Campuses With Students</MenuItem>
                </Select>
            </FormControl>

            <Dialog onClose={handleClose} open={open}>
                <CampusForm handleClose={handleClose} />
            </Dialog>
            <Campuses campuses={filteredCampuses} />
    </div>

    );
    else return (
        <h1>Loading...</h1>
    )
}

export default CampusesView;


