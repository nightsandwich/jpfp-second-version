import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateStudent, deleteStudentSchool } from './store'

class UpdateStudent extends Component {
    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            imageUrl: '',
            gpa: '',
            campusId: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
   async componentDidMount(){
        const student = (await axios.get(`/api/students/${this.props.match.params.id}`)).data
        this.setState(student);
    }

    onChange(ev){
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }
    async onSubmit(ev){
        ev.preventDefault();
        try{
            await this.props.update(this.state);
        } catch (ex){
            console.log(ex);
//=--------------------add error           
        }
    }

    render() {
        const {firstName, lastName, email, imageUrl, gpa, campusId} = this.state;
        const {onChange, onSubmit} = this;
        const {campuses, student} = this.props;
//-----------const isDisabled = !name || !address ;
        return (
            <div className='edit'>
                <h2>Edit Student Information</h2>
                <form onSubmit={ onSubmit }>
                    First Name
                    <br/>
                    <textarea rows='1' cols='50' name='firstName' value={firstName} onChange={onChange} />
                    <br/>
                    Last Name
                    <br/>
                    <textarea rows='1' cols='50' name='lastName' value={lastName} onChange={onChange} />
                    <br/>
                    Email
                    <br/>
                    <textarea rows='1' cols='50' name='email' value={email} onChange={onChange} />
                    <br/>
                    Image URL
                    <br/>
                    <textarea rows='1' cols='50' name='imageUrl' value={imageUrl} onChange={onChange} />
                    <br/>
                    GPA
                    <br/>
                    <textarea rows='1' cols='50' name='gpa' value={gpa} onChange={onChange} />
                    <br/>
                    Campus
                    <br/>
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
                    <br/>
                    <br/> 
                    <button >Update Student Info</button>
                </form>
                    <br/>
                     
            </div>
        )
    }
}
const mapState = (state, otherProps) => {
    const student = state.students.find(student => student.id === otherProps.match.params.id * 1) || {};
    return {
        student: student,
        campuses: state.campuses
    }
}

const mapDispatch = (dispatch, {history}) => {
    return {
        update: (student) => dispatch(updateStudent(student, history))
    }
}
export default connect(mapState, mapDispatch)(UpdateStudent);
