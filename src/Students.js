import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {Button, Grid,Typography, CardActionArea, CardActions, CardContent, Card, CardMedia} from '@mui/material';
import {deleteStudent} from './store';

const Students = ({students, match}) => {
    const dispatch = useDispatch(); 
    const history = useHistory();
    if(!students.length) return (<h1>loading</h1>)
    else 
    return (
        <div>
        <div className='addContainer'>
            <Grid container spacing={2}  direction='row' >
            {
                    students.map(student => {
                        return (
                            <Grid key={student.id} item xs={7} sm={4}>
                            <Card sx={{ maxWidth: 400, maxHeight: 400}} >
                                <CardActionArea onClick={()=>history.push(`/students/${student.id}`)}>
                                    <CardMedia
                                        component="img"
                                        height="130"
                                        image={student.imageUrl}
                                        alt="student image"
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                        {student.firstName} {student.lastName} 
                                        </Typography>
                                        <Typography variant="body1" color="text.primary">
                                        {student.campusId ? `Enrolled at ${student.campus.name}.` : 'No enrollment.'}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                        {student.campusId ? `GPA: ${student.gpa}.` : ''}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea >
                                <CardActions>
                                    <Button onClick={()=>dispatch(deleteStudent(student.id))} size="small" variant="contained" color='error'>Delete</Button>
                                    <Button onClick={()=>history.push(`/students/${student.id}`)} variant="contained" color="primary" size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </div>
    </div>
    );
}

export default Students;

