import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {updateStudent} from './store';
import StudentForm from "./StudentForm";
import {Button, Dialog, Typography, CardActionArea, CardContent, Card, CardMedia} from '@mui/material';

const Student = ({match}) => {
    let history = useHistory();
    const dispatch = useDispatch();

    const student = useSelector(state => state.students.find(student => student.id === +match.params.id) || {});
    const campus = useSelector(state => state.campuses.find(campus => campus.id === student.campusId) || {});
    const onClick = () => {
        dispatch(updateStudent({...student, campusId: null}));
        history.push(`/campuses/${campus.id}`);
    }
    if (!student.id){
        return('...loading student');
    }
    return (
        <>
            <StudentForm action={'update'} studentId={student.id} />
            <Card sx={{ maxWidth: 500 }} >
                <Typography gutterBottom variant="h5" component="div">
                {student.firstName} {student.lastName} <Button size='small' variant='contained' color='success' >Edit Student</Button>
                </Typography>
                <CardMedia
                    component="img"
                    height="400"
                    image={student.imageUrl}
                    alt="student image"
                />
                <CardContent>
                    <Typography variant="body1" color="text.primary" component="div">
                        {/* {campus.id ? 'Currently attending ' + <Link style={{ color: 'darkslategrey'}} to={`/campuses/${campus.id}`}>{campus.name}</Link> + ' ' + <Button size='small' variant='outlined' color='error' onClick={onClick}>Unenroll</Button> : 'Not enrolled in a school.' } */}
                        {campus.id ? 'Currently attending ' : 'Not enrolled in a school.' }
                        {campus.id ? <Link style={{ color: 'darkslategrey'}} to={`/campuses/${campus.id}`}>{campus.name}</Link> : '' }
                        {campus.id ? <Button size='small' variant='outlined' color='error' onClick={onClick} style={{marginLeft: '1rem'}}>Unenroll</Button> : '' }
                        <br></br>
                        {campus.id ? `GPA: ${student.gpa}` : '' }
                        <br></br> 
                        Email: {student.email}
                    </Typography>
                </CardContent>
            </Card>
        </>
        );
    
}

export default Student;