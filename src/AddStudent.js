//TODO ADD SCHOOL OPTION
//get added at end of the list - need to be ordered alphaebicalltyadlkfjsdlkf

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addStudent } from './store'

class AddStudent extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            imageUrl: '',
            gpa: '',
            campusId: '',
            error: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }
    onChange(ev){
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }

    async onSubmit(ev){
        const {firstName, lastName, email, imageUrl, gpa, campusId} = this.state;
        ev.preventDefault();
        try{
            await this.props.create({firstName, lastName, email, imageUrl, gpa, campusId});
        } catch (ex){
            console.log(ex);
            this.setState({error: ex.response.data.error});
        }
        this.setState({firstName: '', lastName: '', email: '', imageUrl: '', gpa: '', campusId: ''});    
    }

    validate(firstName, lastName, campusId, email, gpa){
        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        const validGpa = new RegExp('^[0-3]+(.[0-9]{0,1})?$|^4+(.[0]{0,1})?$');
        
        return {
            firstName: !firstName.length,
            lastName: !lastName.length,
            email: !email.length || !validEmail.test(email),
            gpa: !gpa.length || !validGpa.test(gpa),
            campusId: !campusId
        }
    }

    render() {
        const {firstName, lastName, email, imageUrl, gpa, campusId, error} = this.state;
        const {onChange, onSubmit, validate} = this;
        const {campuses} = this.props;

        const errors = validate(firstName, lastName, campusId, email, gpa);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        
        return (
            
                <form onSubmit={ onSubmit } className='add'>
                    <h3>Add New Student</h3>
                    <label>First Name<sup>*</sup></label>
                    <textarea className={errors.firstName ? 'error' : ''} rows='1' cols='50' name='firstName' value={firstName} onChange={onChange} />
                    <label>Last Name<sup>*</sup></label>
                    <textarea className={errors.lastName ? 'error' : ''} rows='1' cols='50' name='lastName' value={lastName} onChange={onChange} />
                    <label>Email<sup>*</sup> <small className='errormessage'>{errors.email ? '---Please enter a valid email address---' : ''}</small></label>
                    <textarea className={errors.email ? 'error' : ''} rows='1' cols='50' name='email' value={email} onChange={onChange} />
                    <label>Image URL</label>
                    <textarea rows='1' cols='50' name='imageUrl' value={imageUrl} onChange={onChange} />
                    <label>Campus<sup>*</sup></label>
                    <select className={errors.email ? 'error' : ''} name='campusId' onChange={onChange} value={campusId}>
                        <option name='campusId' onChange={onChange} value={null}>SELECT CAMPUS</option>
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
                    <label>GPA<sup>*</sup><small className='errormessage'>{errors.gpa ? '---GPA should be between 0.0 and 4.0---' : ''}</small></label>
                    <textarea className={errors.gpa ? 'error' : ''} rows='1' cols='50' name='gpa' value={gpa} onChange={onChange} />
                    <button disabled={!isEnabled}>ADD STUDENT</button>
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
}

const mapDispatch = (dispatch) => {
    return {
        create: (student) => dispatch(addStudent(student))
    }
}
export default connect(({campuses})=> ({campuses}), mapDispatch)(AddStudent);
