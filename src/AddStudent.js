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

    render() {
        const {firstName, lastName, email, imageUrl, gpa, campusId} = this.state;
        const {onChange, onSubmit} = this;
        const {campuses} = this.props;
//-----------const isDisabled = !name || !address ;
        
        return (
            
                <form onSubmit={ onSubmit } className='add'>
                    <label>First Name<sup>*</sup></label>
                    <textarea rows='1' cols='50' name='firstName' value={firstName} onChange={onChange} />
                    <label>Last Name<sup>*</sup></label>
                    <textarea rows='1' cols='50' name='lastName' value={lastName} onChange={onChange} />
                    <label>Email<sup>*</sup></label>
                    <textarea rows='1' cols='50' name='email' value={email} onChange={onChange} />
                    <label>Image URL</label>
                    <textarea rows='1' cols='50' name='imageUrl' value={imageUrl} onChange={onChange} />
                    <br/>
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
                    <label>GPA<sup>*</sup></label>
                    <textarea rows='1' cols='50' name='gpa' value={gpa} onChange={onChange} />
                    <button >ADD STUDENT</button>
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
