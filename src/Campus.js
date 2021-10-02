import React, { useState } from "react";
import { useSelector } from "react-redux";
import CampusForm from "./CampusForm";
import {Button, Dialog, Typography, CardContent, Card, CardMedia} from '@mui/material';
import EnrolledStudents from "./EnrolledStudents";

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
    //
    
   const campus = useSelector(state => state.campuses.find(campus => campus.id === +match.params.id) || {})
   const students = useSelector(state => state.students.filter(student => student.campusId === campus.id) || []);

   if (!campus.id){
       return '...loading campus';
   } 
    return (
    <div>
        <Dialog onClose={handleClose} open={open}>
            <CampusForm action={'update'} campusId={campus.id} handleClose={handleClose}/>
        </Dialog>
        <div>
            <Card sx={{ maxWidth: 500 }} variant='outlined'>
                <Typography variant="h5" component="div" >
                {campus.name} <Button size='small' variant='contained' color='success' onClick={handleOpen}>Edit School</Button>
                </Typography>
                <CardMedia
                    component="img"
                    height="400"
                    image={campus.imageUrl}
                    alt="campus image"
                    />
                <CardContent>
                    <hr></hr>
                    <Typography variant="body2" color="text.secondary" component="div">
                    {campus.address}
                    </Typography>
                    <hr></hr>
                    <Typography  variant="body2" component="div">
                    {campus.description}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                    {
                        !students.length ? '(No students currently enrolled.)' : ''
                    }
                    </Typography>
                    {students.length ? <EnrolledStudents campusId={campus.id} /> : ''}
                </CardContent>
            </Card>
        </div>
    </div>
    );
}

export default Campus;