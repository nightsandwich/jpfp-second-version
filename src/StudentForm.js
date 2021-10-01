import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';
import { addStudent, updateStudent } from './store';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";


const StudentForm = ({ action='add', studentId, handleClose}) => {
    
    const dispatch = useDispatch();

    //mapState
    const student = useSelector(state => state.students.find(student => student.id === studentId) || {});
    console.log(student)
    const _campuses = useSelector(state => state.campuses);
    const campuses = _campuses.sort((a,b) => (a.name > b.name) ? 1 : -1);
    
    const [inputs, setInputs] = useState(() => ({
        id: '',
        firstName: '',
        imageUrl: action === 'add' ? 'student.png' : '',
        lastName: '',
        email: '',
        gpa: '',
        campusId: '',
        
    }));
    
    const {id, firstName, imageUrl, lastName, email, gpa, campusId } = inputs;
    
    //componentDidUpdate
    useEffect(() => {setInputs({...inputs, ...student, campusId: campusId === null ? '' : student.campusId})},action === 'update' ? [student] : []);
    
    // const validate = (name, address) => {
    //     return {
    //         name: !name.length,
    //         address: !address.length
    //     }
    // }
    // const errors = validate(name, address);
    // const isEnabled = !Object.keys(errors).some(x => errors[x]);

    const onChange = ev => {
        const change = {};
        change[ev.target.name] = ev.target.value;
        setInputs({...inputs, ...change});
    }

    const onSubmit = (ev) => {
        
        ev.preventDefault();
        try{
            action === 'add' ? dispatch(addStudent({ firstName, imageUrl, lastName, email, gpa })) :
            dispatch(updateStudent({id, firstName, imageUrl, lastName, email, gpa, campusId }));
        }
        catch(ex){
            setInputs({...inputs, error: ex.response.data.error});
        }
        setInputs({firstName: '', imageUrl: '', lastName: '', email: '', error: '', id: '', gpa: ''});
        handleClose(ev);
    }
    
    return (
        <>
    <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
          <button onClick={(ev)=> handleClose(ev)}>X</button>
      <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{margin: '.5rem', display: 'flex', flexDirection: 'column'}}>
                    <TextField style={{width: '90%'}} helperText='Required' variant='outlined' id="name-input" name="firstName" label="First Name" type="text" value={firstName} onChange={onChange}/>
                    <TextField style={{width: '90%'}} helperText='Required' variant='outlined' id="lastName-input" name="lastName" label="Last Name" type="text" value={lastName} onChange={onChange}/>
                    <TextField style={{width: '90%'}} helperText='Required' variant='outlined' id="email-input" name="email" label="Email" type="text" value={email} onChange={onChange}/>
                    <TextField style={{width: '90%'}} variant='outlined' id="imageUrl-input" name="imageUrl" label="Image URL" type="text" value={imageUrl} onChange={onChange}/>
                    <TextField style={{width: '90%'}} variant='outlined' id="gpa-input" name="gpa" label="GPA" type="text" value={gpa} onChange={onChange}/>
                    
                        <InputLabel>Campuses</InputLabel>
                        <Select
                            value={campusId === null ? '' : campusId}
                            label="Campuses"
                            onChange={onChange}
                            name="campusId"
                        >
                            {/* <MenuItem key={'no'} value={''}>None</MenuItem> */}
                            {
                                campuses.map(campus => {
                                    return (
                                        <MenuItem key={campus.id} value={campus.id}>{campus.name}</MenuItem>
                                    );
                                })
                            }
                        </Select>
                    <br></br>
                    <Button style={{width: '90%'}} variant='contained' color='primary' onClick={(ev) => onSubmit(ev)}>{action === 'add' ? 'Add' : 'Update'}</Button>
            </div>
      </div>
    </Box>
        
        </>
    )
}

export default StudentForm;