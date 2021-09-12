//TODO ADD SCHOOL OPTION


import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateStudent } from './store'

export class UpdateStudent extends Component {
    constructor(){
        super();
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
        console.log('thisprops', this.props);
        this.setState(change);
        console.log(this.state);
    }
    async onSubmit(ev){
        ev.preventDefault();
        try{
            await this.props.update(this.state);
        } catch (ex){
            console.log(ex);
            //=--------------------add error           
        }
        //this.setState({firstName: '', lastName: '', email: '', imageUrl: '', gpa: ''});
        
    }

    render() {
        const {firstName, lastName, email, imageUrl, gpa} = this.state;
        const {onChange, onSubmit} = this;
//-----------const isDisabled = !name || !address ;
// console.log('thisprops2', this.props);
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
                    <button >UPDATE STUDENT</button>
                </form>
            </div>
        )
    }
}
const mapState = (state, otherProps) => {
    console.log(otherProps);
    const student = state.students.find(student => student.id === otherProps.match.params.id * 1) || {}; 
    console.log('STUDENTTTTTTT', student);
    return {
        student: student
    }
}

const mapDispatch = (dispatch, {history}) => {
    return {
        update: (student) => dispatch(updateStudent(student, history))
    }
}
export default connect(null, mapDispatch)(UpdateStudent);
