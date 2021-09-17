
import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateCampus, deleteStudentSchool } from './store'

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
        try{
            const campus = (await axios.get(`/api/campuses/${this.props.match.params.id}`)).data || {};
            this.setState(campus);
        }
        catch(ex){
            console.log(ex);
        }
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
        } 
        catch (ex){
            console.log(ex);
        }
    }

     async onClick(ev){
        const {students} = this.state;
        this.setState({...this.state, students: students.filter(student => student.id !== ev.target.value * 1)});
        const student = (await axios.get(`/api/students/${ev.target.value}`)).data || {};
        try{
            await this.props.deleteStudentSchool(student);
        } 
        catch (ex){
            console.log(ex);
        }
    }

    render() {
            const {name, imageUrl, address, description, students} = this.state;
            const {onChange, onSubmit, onClick} = this;
            
            return (
                <div className='edit'>
                    <h2>Edit Campus Information</h2>
                    <form onSubmit={ onSubmit } >
                        Name of School
                        <br/>
                        <textarea rows='1' cols='50' name='name' value={name} onChange={onChange} />
                        <br/>
                        Image URL
                        <br/>
                        <textarea rows='1' cols='50' name='imageUrl' value={imageUrl} onChange={onChange} />
                        <br/>
                        Address
                        <br/>
                        <textarea rows='1' cols='50' name='address' value={address} onChange={onChange} />
                        <br/>
                        Description
                        <br/>
                        <textarea rows='12' cols='50' name='description' value={description} onChange={onChange} />
                        <br/>
                        <button >Update Campus Info</button>
                    </form>
                    <br></br>
                    <div>
                        {students.length ? `Enrollees: ${students.length}` : 'No students currently enrolled.'}
                        <ul>
                    {
                        students.map((student) => {
                            return (
                                <li key={student.id}>
                                    {student.firstName} {student.lastName} <button value={student.id} onClick={onClick}>Unenroll</button>
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
// const mapState = (state, otherProps) => {
//     const campus = state.campuses.find(campus => campus.id === otherProps.match.params.id * 1) || {}; 
//     const students = campus.students || [];
//     return {
//         storeCampus: campus,
//         storeStudents: students
//     }
// }

const mapDispatch = (dispatch) => {
    return {
        update: (campus) => dispatch(updateCampus(campus)),
        deleteStudentSchool: (student) => dispatch(deleteStudentSchool(student))
    }
}
export default connect(null, mapDispatch)(UpdateCampus);
