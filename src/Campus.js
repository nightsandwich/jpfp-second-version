import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CampusForm from "./CampusForm";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, Typography, Stack, CardContent, Grid, Paper, Card, CardMedia} from '@mui/material';
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
    
    <Card sx={{ maxWidth: 500 }} >
        <Typography gutterBottom variant="h5" component="div">
        {campus.name} <Button size='small' variant='contained' color='success' onClick={handleOpen}>Edit Campus</Button>
        </Typography>
        <CardMedia
            component="img"
            height="400"
            image={campus.imageUrl}
            alt="campus image"
            />
        <CardContent>
            <Typography variant="body2" color="text.secondary" component="div">
            {campus.address}
            </Typography>
            <Typography  variant="body2" component="div">
            {campus.description}
            </Typography>
            <Typography variant="body2" color="text.primary">
            {
                !students.length ? '(No students currently enrolled.)' : ''
                
                // <TableContainer >
                //     <Table sx={{ minWidth: 650 }} aria-label="simple table" component={Paper}>
                //         <TableRow>
                //             <TableCell align='center'>
                //             Enrolled Students ({students.length})
                //             </TableCell>
                //         </TableRow>
                //     </Table>
                //     <Table sx={{ minWidth: 650 }} aria-label="simple table" component={Paper}>
                //         <TableHead>
                //             <TableRow>
                //                 <TableCell >Name</TableCell>
                //                 <TableCell >Email</TableCell>
                //                 <TableCell >GPA</TableCell>
                //                 <TableCell ></TableCell>
                //             </TableRow>
                //         </TableHead>
                //         <TableBody>
                //         {students.map((student) => (
                //             <TableRow
                //             hover
                //             key={student.id}
                //             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                //             >
                //             <TableCell component="th" scope="row">
                //                 <Link style={{ color: 'darkslategrey'}} to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                //             </TableCell>
                //             <TableCell >{student.email}</TableCell>
                //             <TableCell >{student.gpa}</TableCell>
                //             <TableCell ><Button variant='outlined' color='error'>Unenroll</Button></TableCell>
                //             </TableRow>
                //         ))}
                //         </TableBody>
                //     </Table>

                // </TableContainer>
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