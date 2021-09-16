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
        const student = (await axios.get(`/api/students/${this.props.match.params.id}`)).data
        this.setState(student);
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps !== this.props){
            this.setState({campusId: this.props.student.campusId});
        }
console.log('campusId',this.state.campusId)
//why is this not updating the dropdown menu?
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
                <div>
                    <button onClick={dropSchool}>Unenroll From School</button> 
                </div>
                <form onSubmit={ onSubmit }>
                    <textarea rows='1' cols='50' name='firstName' value={firstName} onChange={onChange} />
                    <br/>
                    <textarea rows='1' cols='50' name='lastName' value={lastName} onChange={onChange} />
                    <br/>
                    <textarea rows='1' cols='50' name='email' value={email} onChange={onChange} />
                    <br/>
                    <textarea rows='1' cols='50' name='imageUrl' value={imageUrl} onChange={onChange} />
                    <br/>
                    <textarea rows='1' cols='50' name='gpa' value={gpa} onChange={onChange} />
                    <br/>
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
                    <br/>
                    <button >Update Student Info</button>
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
