import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CampusForm from "./CampusForm";
import { deleteCampus, loadCampuses } from "./store";

import {Button, Grid,Typography, FormControl, MenuItem, InputLabel, Select, CardActionArea, CardActions, CardContent, Card, CardMedia} from '@mui/material';


const Campuses = ({location, match}) => {
    //mapState
    const campuses = useSelector(({campuses}) => campuses);
    //mapDispatch
    const dispatch = useDispatch(); 
    let history = useHistory();

    useEffect(() => dispatch(loadCampuses()), []); //componentDidMount
    
    
    // //pagination
    // const start = 10 * (location.search.slice(6) - 1) + 1;
    // const end = start + 9;
    
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
    // const sortedByState = [...campuses].sort((a,b) => (a.address.split(', ').slice(2,3).join('').split(' (')[0] > b.address.split(', ').slice(2,3).join('').split(' (')[0]) ? 1 : -1);
    const campusesToRender = inputs.view === 'normal' ? sortedByName : inputs.view === 'students' ? sortedByStudents : '';
    
    const filteredCampuses = campusesToRender.filter(campus => {
        return inputs.filter === 'all' ? 
        campus : 
        inputs.filter === 'students' ?
        campus.students.length :
        !campus.students.length
    });
    // const paginatedCampuses = filteredCampuses.filter((campus,idx) => idx + 1 >= start && idx + 1 <= end ? campus : '');
    
    return (
    <div>
        <h1>Campuses</h1>
        <CampusForm />
        
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
        
        <div className='addContainer'>
            <Grid container spacing={2}  direction='row' >
            {
                    filteredCampuses.map(campus => {
                        return (
                            <Grid item xs={7} sm={4}>
                            <Card sx={{ maxWidth: 400, maxHeight: 400}} >
                                <CardActionArea onClick={()=>history.push(`/campuses/${campus.id}`)}>
                                    <CardMedia
                                        component="img"
                                        height="130"
                                        image={campus.imageUrl}
                                        alt="campus image"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                        {campus.name}
                                        </Typography>
                                        <Typography variant="body1" color="text.primary">
                                        {campus.students.length === 0 ? 'No students enrolled.' : campus.students.length === 1 ? '1 student enrolled.' : `${campus.students.length} students enrolled.`}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea >
                                <CardActions>
                                    <Button onClick={()=>dispatch(deleteCampus(campus.id))} size="small" variant="contained" color='error'>Delete Campus</Button>
                                    <Button onClick={()=>history.push(`/campuses/${campus.id}`)} variant="contained" color="primary" size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </div>
        <div>
            <CampusForm action={'add'}  />
        </div>
    </div>

    );
}

export default Campuses;


