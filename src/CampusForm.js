import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';
import { addCampus, updateCampus, updateStudent } from './store';
import { TextField, Button, Box, List, ListItem, ListItemText } from "@mui/material";
import EnrolledStudents from "./EnrolledStudents";

const CampusForm = ({ action='add', campusId, handleClose}) => {
    
    const dispatch = useDispatch();

    //mapState
    const campus = useSelector(state => state.campuses.find(school => school.id === campusId) || {});
    const students = action === 'update' ? useSelector(state => state.students.filter(student => student.campusId === campusId) || []) : '';
    
    const [inputs, setInputs] = useState(() => ({
        id: '',
        name: '',
        imageUrl: action === 'add' ? 'campus.png' : '',
        address: '',
        description: '',
        error: ''
    }));
    
    const {id, name, imageUrl, address, description, error} = inputs;
    
    //componentDidUpdate
    useEffect(() => {setInputs({...inputs, ...campus})},action === 'update' ? [campus] : []);
    
    const validate = (name, address) => {
        return {
            name: !name.length,
            address: !address.length
        }
    }
    const errors = validate(name, address);
    const isEnabled = !Object.keys(errors).some(x => errors[x]);

    const onChange = ev => {
        const change = {};
        change[ev.target.name] = ev.target.value;
        setInputs({...inputs, ...change});
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        try{
            action === 'add' ? dispatch(addCampus({name, imageUrl, address, description})) :
            dispatch(updateCampus({id, name, imageUrl, address, description}));
        }
        catch(ex){
            setInputs({...inputs, error: ex.response.data.error});
        }
        setInputs({name: '', imageUrl: '', address: '', description: '', error: '', id: ''});
        handleClose(ev);
    }

    const onClick = (student) => {
        dispatch(updateStudent({...student, campusId: null}));
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
            <div style={{display: 'flex'}}>
                <div style={{margin: '.5rem', display: 'flex', flexDirection: 'column', width: '50%'}}>
                    <TextField style={{width: '90%'}} helperText='Required' variant='standard' id="name-input" name="name" label="Name" type="text" value={name} onChange={onChange}/>
                    <TextField style={{width: '90%'}} variant='standard' id="image-url-input" name="imageUrl" label="Image URL" type="text" value={imageUrl} onChange={onChange}/>
                    <TextField style={{width: '90%'}} helperText='Required' variant='standard' id="address-input" name="address" label="Address" type="text" value={address} onChange={onChange}/>
                    <Button style={{width: '90%'}} variant='contained' color='primary' onClick={onSubmit}>{action === 'add' ? 'Add' : 'Update'}</Button>
                </div>
                <div style={{width: '50%', margin: '.5rem'}}>
                    <TextField maxRows={11} style={{width: '90%'}} variant='standard' id="description-input" name="description" label="Description" multiline value={description} onChange={onChange}/>
                </div>
            </div>
            <div style={{margin: '.5rem', marginTop: 'none'}}>
                {action === '' ? '' : !students.length ? 'No students currently enrolled.' : <EnrolledStudents campusId={campus.id}/>}
            </div>
                {/* // <div style={{width: '30%'}}> */}
                    {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItemText>{!students.length ? 'No students currently enrolled.' : ''}</ListItemText>
                    {
                        students.map((student) => {
                            return (
                                <>
                                <ListItem alignItems="flex-start" key={student.id}>
                                <ListItemText>{student.firstName} {student.lastName}</ListItemText>
                                </ListItem>
                                <Button value={student.id} variant='outlined' size='small' color='error' onClick={()=> onClick(student)}>Unenroll</Button>
                                </>
                                );
                            })
                        }
                //     </List> */}
                {/* // // </div> */}
      </div>
    </Box>
        
        </>
    )
}

export default CampusForm;