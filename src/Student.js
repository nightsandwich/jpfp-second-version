import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {updateStudent} from './store';
import StudentForm from "./StudentForm";

import {Button, Dialog, Typography, CardContent, Card, CardMedia} from '@mui/material';
const Student = ({match}) => {

    const dispatch = useDispatch();

    //dialog
        const [open, setOpen] = useState(false);
        
        const handleOpen = () => {
            setOpen(true);
        }
        const handleClose = (ev) => {
            ev.preventDefault();
            setOpen(false);
        }
    //dialog

    const student = useSelector(state => state.students.find(student => student.id === +match.params.id) || {});
    const campus = useSelector(state => state.campuses.find(campus => campus.id === student.campusId) || {});
    const onClick = async() => {
        try{
            await dispatch(updateStudent({...student, campusId: null}));
        }
        catch(ex){
            console.log(ex)
        }
    }   

    if (!student.id){
        return('...loading student');
    }
    return (
        <>
        <Dialog onClose={handleClose} open={open}>
            <StudentForm action={'update'} studentId={student.id} handleClose={handleClose}/>
        </Dialog>
           
            <Card sx={{ maxWidth: 500 }} variant='outlined'>
                <Typography gutterBottom variant="h5" component="div">
                {student.firstName} {student.lastName} <Button size='small' variant='contained' color='success' onClick={handleOpen}>Edit Student</Button>
                </Typography>
                <CardMedia
                    component="img"
                    height="400"
                    image={student.imageUrl}
                    alt="student image"
                />
                <CardContent>
                    <Typography variant="body1" color="text.primary" component="div">
                        {campus.id ? 'Enrolled at ' : 'Not enrolled in a school.' }
                        {campus.id ? <Link style={{ color: 'darkslategrey'}} to={`/campuses/${campus.id}`}>{campus.name}</Link> : '' }
                        {campus.id ? <Button size='small' variant='outlined' color='error' onClick={onClick} style={{marginLeft: '1rem'}}>Unenroll</Button> : '' }
                        <hr></hr>
                        {campus.id ? `GPA: ${student.gpa}` : '' }
                        <hr></hr> 
                        Email: {student.email}
                        
                    </Typography>
                </CardContent>
            </Card>
        </>
        );
    
}

export default Student;