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
                    <TextField style={{width: '90%'}} helperText='Required' variant='outlined' id="name-input" name="name" label="Name" type="text" value={name} onChange={onChange}/>
                    <TextField style={{width: '90%'}} variant='outlined' id="image-url-input" name="imageUrl" label="Image URL" type="text" value={imageUrl} onChange={onChange}/>
                    <TextField style={{width: '90%'}} helperText='Required' variant='outlined' id="address-input" name="address" label="Address" type="text" value={address} onChange={onChange}/>
                    <Button style={{width: '90%'}} variant='contained' color='primary' onClick={onSubmit}>{action === 'add' ? 'Add' : 'Update'}</Button>
                </div>
                <div style={{width: '50%', margin: '.5rem'}}>
                    <TextField maxRows={11} style={{width: '90%'}} variant='outlined' id="description-input" name="description" label="Description" multiline value={description} onChange={onChange}/>
                </div>
            </div>
            <div style={{margin: '.5rem', marginTop: 'none', fontFamily: 'Roboto'}}>
                {action === 'add' ? '' : !students.length ? 'No students.' : <EnrolledStudents campusId={campus.id}/>}
            </div>
      </div>
    </Box>
        
    </>
    )
}

export default CampusForm;