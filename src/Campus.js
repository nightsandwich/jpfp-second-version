import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CampusForm from "./CampusForm";
import {Button, Dialog, Typography, FormControl, MenuItem, InputLabel, Select, CardActionArea, CardActions, CardContent, Card, CardMedia} from '@mui/material';

const Campus = ({match}) => {
    //dialog
    const [open, setOpen] = useState(false);
 
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = (ev) => {
        ev.preventDefault();
        setOpen(false);
    }
     
   const campus = useSelector(state => state.campuses.find(campus => campus.id === +match.params.id) || {})
   const students = useSelector(state => state.students.filter(student => student.campusId === campus.id) || []);

   if (!campus.id){
       return '...loading campus';
   } 
    return (
    <div className = 'addContainer'>
        <Dialog onClose={handleClose} open={open}>
            <CampusForm action={'update'} campusId={campus.id} handleClose={handleClose}/>
        </Dialog>
    <div className='infocontainer'>
    <h1>{campus.name}</h1><Button variant='contained' color='success' onClick={handleOpen}>Edit Campus</Button>
    <Card sx={{ maxWidth: 700 }} >
        <CardActionArea >
            <CardMedia
                component="img"
                height="500"
                image={campus.imageUrl}
                alt="campus image"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {campus.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                {campus.address}
                </Typography>
                <Typography  variant="body2" component="div">
                {campus.description}
                </Typography>
                <Typography variant="body2" color="text.primary">
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
                </Typography>
            </CardContent>
        </CardActionArea >
        <CardActions>
            <Button onClick={()=>history.push(`/campuses/${campus.id}`)} variant="contained" color="primary" size="small">Edit Campus</Button>
        </CardActions>
    </Card>
        
    </div>
    
    </div>
    );
}

export default Campus;