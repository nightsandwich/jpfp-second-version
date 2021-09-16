//TODO ADD SCHOOL OPTION


import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateStudent, deleteStudentSchool } from './store'

export class UpdateStudent extends Component {
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
        this.dropSchool = this.dropSchool.bind(this);
    }
    
   async componentDidMount(){
    //    console.log('thisssssssssss', this);
         const student = (await axios.get(`/api/students/${this.props.match.params.id}`)).data
    //     console.log('studentttttttt', student)
        // const {student} = this.props;
        console.log('thisprops', this.props);
        this.setState(student);
    }
    onChange(ev){
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
        console.log('state',this.state);
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
    async dropSchool(ev){
        try{
            await this.props.dropSchool(this.props.student);
        }
        catch(ex){
            console.log(ex)
        }
    }

    render() {
        const {firstName, lastName, email, imageUrl, gpa, campusId} = this.state;
        const {onChange, onSubmit, dropSchool} = this;
        const {campuses} = this.props;
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
                    Schools:    
                    <select name='campusId' onChange={onChange} value={campusId}>
                        <option name='campusId' onChange={onChange} value={null}> </option>
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
                    <button >UPDATE STUDENT</button>
                    {/* 
                    Unenroll from school?
                    <input type='checkbox' value={this.props.student.id} onChange={dropSchool} /> */}
                </form>
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
        update: (student) => dispatch(updateStudent(student, history)),
        dropSchool: (student) => dispatch(deleteStudentSchool(student))
    }
}
export default connect(mapState, mapDispatch)(UpdateStudent);
