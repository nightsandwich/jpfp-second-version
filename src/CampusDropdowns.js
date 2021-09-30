import React, { useState } from "react";
import { useSelector } from "react-redux";
import {FormControl, MenuItem, InputLabel, Select} from '@mui/material';

const CampusDropdowns = () => {
    //mapState
    const campuses = useSelector(({campuses}) => campuses);
    
    //local state
    const [inputs, setInputs] = useState({ 
        view: 'normal',
        filter: 'all'
    })
    
    //sort and filter
    const chooseSortFilter = (ev) => {
        setInputs({...inputs, [ev.target.name]: ev.target.value});
    }
     
    return (
        <>
        <FormControl sx={{m:1, minWidth: 120}} >
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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
        </>
    )
}

export default CampusDropdowns;