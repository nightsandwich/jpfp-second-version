import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';
import { addStudent, updateStudent } from './store';
// import { Form, Button } from "react-bootstrap";

const StudentForm = ({action, studentId}) => {    
    console.log('render')
    const dispatch = useDispatch();
    
    //mapState
    const student = useSelector(state => state.students.find(student => student.id === studentId) || {});
    const campuses = useSelector(({campuses}) => campuses);
    const campus = action === 'update' ? useSelector(state => state.campuses.find(campus => campus.id === student.campusId) || {}) : '';
    const [inputs, setInputs] = useState(() => ({
        id: '',
        firstName: '',
        lastName: '',
        imageUrl: action === 'add' ?  'student.png' : '',
        email: '',
        gpa: '',
        error: '',
        campusId: ''
    }));
    
    const {id, firstName, lastName, imageUrl, email, gpa, error, campusId} = inputs;
console.log(inputs.campusId)
    //componentDidUpdate
    
    useEffect(() => {setInputs({ ...inputs, ...student})}, action === 'update' ? [student] : []);
    //useEffect(() => {setInputs({...inputs, ...student, campusId: campus.id})}, action === 'update' ? [campus] : []);
    const validate = (firstName, lastName, email, gpa) => {
        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        const validGpa = new RegExp('^[0-3]+(.[0-9]{0,1})?$|^4+(.[0]{0,1})?$');        
        return {
            firstName: !firstName.length,
            lastName: !lastName.length,
            email: !email.length,
            gpa: gpa < 0 || gpa > 4 || !gpa,
        }
    }

    const errors = validate(firstName, lastName, email, gpa);
    const isEnabled = !Object.keys(errors).some(x => errors[x]);
    
    const onChange = ev => {
        const change = {};
        change[ev.target.name] = ev.target.value;
        setInputs({...inputs, ...change});
    }

    const onSubmit = ev => {
        ev.preventDefault();
        try{
            action === 'add' ? dispatch(addStudent({firstName, lastName, email, gpa, imageUrl, campusId})) :
            dispatch(updateStudent({id, firstName, lastName, imageUrl , email, gpa, campusId}));
        } catch(ex) {
            setInputs({...inputs, error: ex.response});
        }
        setInputs({firstName: '', lastName: '', email: '', imageUrl: '', gpa: '', error: '', id: ''})
    }
    const actions = [
        {label: 'SELECT CAMPUS', value: null},
        campuses.map(campus => {
            return ({label: campus.name, value: campus.id, key: campus.id })
        })
    ];

    return (   

        <form onSubmit={ onSubmit } className='add'>
            <h3>{action === 'add' ? 'Add Student' : 'Update Student'}</h3>
            <label>First Name<sup>*</sup></label>
            <textarea className={errors.firstName ? 'error' : ''} rows='1' cols='50' name='firstName' value={firstName} onChange={onChange} />
            <label>Last Name<sup>*</sup></label>
            <textarea className={errors.lastName ? 'error' : ''} rows='1' cols='50' name='lastName' value={lastName} onChange={onChange} />
            <label>Email<sup>*</sup> <small className='errormessage'>{errors.email ? '---Please enter a valid email address---' : ''}</small></label>
            <textarea className={errors.email ? 'error' : ''} rows='1' cols='50' name='email' value={email} onChange={onChange} />
            <label>Image URL</label>
            <textarea rows='1' cols='50' name='imageUrl' value={imageUrl} onChange={onChange} />
            <label>Campus</label>
            {/* <Select options={actions} onChange={onChange} value={campus.id}/> */}
            <select className={errors.campusId ? 'error' : ''} name='campusId' onChange={onChange} value={campusId}>
                <option value={''}>SELECT CAMPUS</option>
                {
                    campuses.map( campus => { 
                        return (
                        <option value={ campus.id } key={ campus.id } >
                            {campus.name}
                        </option>
                        );
                    })
                }
            </select>
            <label>GPA<small className='errormessage'>{errors.gpa ? '---GPA should be between 0.0 and 4.0---' : ''}</small></label>
            <textarea className={errors.gpa ? 'error' : ''} rows='1' cols='50' name='gpa' value={gpa} onChange={onChange} />
            <button disabled={!isEnabled}>{action === 'add' ? 'ADD' : 'UPDATE'}</button>
            <br/>
            <small><sup>*</sup>Required Field</small>
            <pre className={error ? 'error' : ''}>
                    {
                        !!error && JSON.stringify(error, null, 2)
                    }
            </pre>
        </form>
    )
}

export default StudentForm;