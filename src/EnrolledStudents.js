import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { updateStudent } from './store';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';

const EnrolledStudents = ({campusId}) => {

    const dispatch = useDispatch();
    
    const students = useSelector(state => state.students.filter(student => student.campusId === campusId) || []);

    const onClick = async(student) => {
        try{
            await dispatch(updateStudent({...student, campusId: null})); 
        }
        catch(ex){
            console.log(ex)
        }
    }
    
    return (
        <>
        <TableContainer >
            <Table sx={{ minWidth: 400 }}>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>
                        Enrolled Students ({students.length})
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <Table sx={{ minWidth: 400 }}>
                <TableHead>
                    <TableRow>
                        <TableCell >Name</TableCell>
                        <TableCell >GPA</TableCell>
                        <TableCell ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {students.map((student) => (
                    <TableRow
                    hover
                    key={student.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell >
                        <Link style={{ color: 'darkslategrey'}} to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                    </TableCell>
                    <TableCell >{student.gpa}</TableCell>
                    <TableCell ><Button variant='outlined' color='error' onClick={()=> onClick(student)}>Unenroll</Button></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}
export default EnrolledStudents;