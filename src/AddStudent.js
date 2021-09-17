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
                    First Name:
                    <textarea rows='1' cols='50' name='firstName' value={firstName} onChange={onChange} />
                    Last Name:
                    <textarea rows='1' cols='50' name='lastName' value={lastName} onChange={onChange} />
                    Email:
                    <textarea rows='1' cols='50' name='email' value={email} onChange={onChange} />
                    Image URL:
                    <textarea rows='1' cols='50' name='imageUrl' value={imageUrl} onChange={onChange} />
                    Campus
                    <select name='campusId' onChange={onChange} value={campusId}>
                        <option name='campusId' onChange={onChange} value={null}>SELECT SCHOOL</option>
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
                    GPA:
                    <textarea rows='1' cols='50' name='gpa' value={gpa} onChange={onChange} />
                    <button >ADD STUDENT</button>
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
