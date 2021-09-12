//TODO ADD SCHOOL OPTION


import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateCampus, deleteStudentSchool } from './store'
import {Link} from 'react-router-dom';
export class UpdateCampus extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            imageUrl: '',
            address: '',
            description: '',
            students: []
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
    }
   async componentDidMount(){
        this.setState((await axios.get(`/api/campuses/${this.props.match.params.id}`)).data);
        console.log(this.state)
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
     async onClick(ev){
        const {students} = this.state;
        this.setState({...this.state, students: students.filter(student => student.id !== ev.target.value * 1)});
        
        const student = (await axios.get(`/api/students/${ev.target.value}`)).data;
        
        try{
            await this.props.deleteStudentSchool(student);
        } catch (ex){
            console.log(ex);
        }
    }
    //component did update for student deletion????
    // destroy(id){
    //     console.log(this.state)
    //     this.setState({...this.state, students: this.state.students.filter(student => student.id !== id)});
    // }

    render() {
            const {name, imageUrl, address, description, students} = this.state;
            const {onChange, onSubmit, onClick} = this;

    //-----------const isDisabled = !name || !address ;
            
            return (
                <div>
                    <form onSubmit={ onSubmit }>
                        Name of School:
                        <input name='name' value={name} onChange={onChange} />
                        Image URL:
                        <input name='imageUrl' value={imageUrl} onChange={onChange} />
                        Address:
                        <input name='address' value={address} onChange={onChange} />
                        Description:
                        <input name='description' value={description} onChange={onChange} />
                        <button >UPDATE</button>
                    </form>
                    <br></br>
                    <div>
                        <ul>
                    {
                        students.map((student) => {
                            return (
                                <li key={student.id}>
                                    <Link to={`/students/${student.id}`}>{student.firstName}</Link>  
                                    <button value={student.id} onClick={onClick}>X</button>
                                </li>
                            );
                        })
                    }
                        </ul>
                    </div>
                </div>
            );
    }
}
const mapState = (state, otherProps) => {
    const campus = state.campuses.find(campus => campus.id === otherProps.match.params.id * 1) || {}; 
    const students = campus.students;
    return {
        storeCampus: campus,
        storeStudents: students
    }
}

const mapDispatch = (dispatch, {history}) => {
    return {
        update: (campus) => dispatch(updateCampus(campus, history)),
        deleteStudentSchool: (student) => dispatch(deleteStudentSchool(student))
    }
}
export default connect(mapState, mapDispatch)(UpdateCampus);
