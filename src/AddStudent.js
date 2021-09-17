//TODO ADD SCHOOL OPTION
//get added at end of the list - need to be ordered alphaebicalltyadlkfjsdlkf

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addStudent } from './store'

export class AddStudent extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            imageUrl: '',
            gpa: '',
            campusId: '',
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
        ev.preventDefault();
        try{
            await this.props.create(this.state);
        } catch (ex){
            console.log(ex);
//=--------------------add error           
        }
        console.log('this.state', this.state);
        this.setState({firstName: '', lastName: '', email: '', imageUrl: '', gpa: '', camppusId: ''});
        
    }
    validate(firstName, lastName, email, gpa){
        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        const validGpa = new RegExp('^[0-3]+(.[0-9]{0,1})?$|^4+(.[0]{0,1})?$');
        
        return {
            firstName: firstName.length === 0,
            lastName: lastName.length === 0,
            email: email.length === 0 || !validEmail.test(email),
            gpa: gpa.length === 0 || !validGpa.test(gpa),
        }
    }

    render() {
        const {firstName, lastName, email, imageUrl, gpa, campusId} = this.state;
        const {onChange, onSubmit, validate} = this;
        const {campuses} = this.props;

        const errors = validate(firstName, lastName, email, gpa);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        
        return (
            
                <form onSubmit={ onSubmit } className='add'>
                    <label>First Name<sup>*</sup></label>
                    <textarea className={errors.firstName ? 'error' : ''} rows='1' cols='50' name='firstName' value={firstName} onChange={onChange} />
                    <label>Last Name<sup>*</sup></label>
                    <textarea className={errors.lastName ? 'error' : ''} rows='1' cols='50' name='lastName' value={lastName} onChange={onChange} />
                    <label>Email<sup>*</sup> <small className='errormessage'>{errors.email ? '---Please enter a valid email address---' : ''}</small></label>
                    <textarea className={errors.email ? 'error' : ''} rows='1' cols='50' name='email' value={email} onChange={onChange} />
                    <label>Image URL</label>
                    <textarea rows='1' cols='50' name='imageUrl' value={imageUrl} onChange={onChange} />
                    <label>Campus<sup>*</sup></label>
                    <select name='campusId' onChange={onChange} value={campusId}>
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
                </form>
            
        )
    }
}

const mapDispatch = (dispatch, {history}) => {
    return {
        create: (student) => dispatch(addStudent(student))
    }
}
export default connect(({campuses})=> ({campuses}), mapDispatch)(AddStudent);
