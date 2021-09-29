import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';
import { addCampus, updateCampus, updateStudent } from './store';

const CampusForm = ({buttonName, action, campusId}) => {
    
    const dispatch = useDispatch();

    //mapState
    const campus = useSelector(state => state.campuses.find(school => school.id === campusId) || {});
    const students = action === 'update' ? useSelector(state => state.students.filter(student => student.campusId === campusId) || []) : '';
    
    const [inputs, setInputs] = useState(() => ({
        id: '',
        name: '',
        imageUrl: '',
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
        setInputs({name: '', imageUrl: '', address: '', description: '', error: ''});
    }
    return (
        <>
        <form onSubmit={ onSubmit } className='add'>
            <h3>{buttonName}</h3>
            <label>Name<sup>*</sup></label>
            <textarea className={errors.name ? 'error' : ''} rows='1' cols='50' name='name' value={name} onChange={onChange} />
            <label>Image URL</label>
            <textarea rows='1' cols='50' name='imageUrl' value={imageUrl} onChange={onChange} />
            <label>Address<sup>*</sup></label>
            <textarea className={errors.address ? 'error' : ''} rows='1' cols='50' name='address' value={address} onChange={onChange} />
            <label>Description</label>
            <textarea rows='12' cols='50' name='description' value={description} onChange={onChange} />
            <button disabled={!isEnabled}>{buttonName}</button>
            <br/>
            <small><sup>*</sup>Required Field</small>
            <pre className={error ? 'error' : ''}>
                    {
                        !!error && JSON.stringify(error, null, 2)
                    }
            </pre>
        </form>
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