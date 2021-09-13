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
        this.setState({firstName: '', lastName: '', email: '', imageUrl: '', gpa: ''});
        
    }

    render() {
        const {firstName, lastName, email, imageUrl, gpa} = this.state;
        const {onChange, onSubmit} = this;
//-----------const isDisabled = !name || !address ;
        
        return (
            <div>
                <form onSubmit={ onSubmit }>
                    First Name:
                    <input name='firstName' value={firstName} onChange={onChange} />
                    Last Name:
                    <input name='lastName' value={lastName} onChange={onChange} />
                    Email:
                    <input name='email' value={email} onChange={onChange} />
                    Image URL:
                    <input name='imageUrl' value={imageUrl} onChange={onChange} />
                    GPA:
                    <input name='gpa' value={gpa} onChange={onChange} />
                    <button >ADD STUDENT</button>
                </form>
            </div>
        )
    }
}

const mapDispatch = (dispatch, {history}) => {
    return {
        create: (student) => dispatch(addStudent(student))
    }
}
export default connect(null, mapDispatch)(AddStudent);
