import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { updateStudent } from './store';
import {Button} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const EnrolledStudents = ({campusId}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const update = (student) => {
        dispatch(updateStudent({...student, campusId: null})); 
    }
    const onClick = async(student) => {
        try{
            await update(student);
        }
        catch(ex){
            console.log(ex)
        }
    }
    //why does this not work here
    const students = useSelector(state => state.students.filter(student => student.campusId === campusId) || []);
    
    return (
        <>
        <TableContainer >
            <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>
                        Enrolled Students ({students.length})
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                <TableHead>
                    <TableRow>
                        <TableCell >Name</TableCell>
                        {/* <TableCell >Email</TableCell> */}
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
                    {/* <TableCell >{student.email}</TableCell> */}
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