import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';
import { addCampus, updateCampus, updateStudent } from './store';
import { TextField, Button } from "@mui/material";

const CampusForm = ({ action='add', campusId}) => {
    
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
    }
    
    return (
        <>
        <TextField id="name-input" name="name" label="Name" type="text" value={name} onChange={onChange}/>
        <TextField id="image-url-input" name="imageUrl" label="Image URL" type="text" value={imageUrl} onChange={onChange}/>
        <TextField id="address-input" name="address" label="Address" type="text" value={address} onChange={onChange}/>
        <TextField id="description-input" name="description" label="Description" multiline maxRows={10} value={description} onChange={onChange}/>
        <br/>
        <Button variant='contained' color='primary' onClick={onSubmit}>{action === 'add' ? 'Add' : 'Update'}</Button>
        <br/>
        <br/> 
        {action === 'update' ? 
            <div>
            {students.length ? `Enrollees: ${students.length}` : 'No students currently enrolled.'}
            <ul>
            {
            students.map((student) => {
                return (
                    <li key={student.id}>
                        {student.firstName} {student.lastName} <button value={student.id} onClick={() => dispatch(updateStudent({...student, campusId: null}))}>Unenroll</button>
                    </li>
                );
            })
            }
            </ul>
        </div>    
        : ''
        }
        </>
    )
}

export default CampusForm;