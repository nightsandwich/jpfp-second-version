
import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCampus, updateStudent } from './store';
import CampusForm from './CampusForm';

class UpdateCampus extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            imageUrl: '',
            address: '',
            description: '',
            students: [],
            error: ''
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
            this.setState({error: ex.response.data.error});       
        }
    }

    onClick(ev){
    const {students} = this.state;
    const studentToUpdate = students.find(student => student.id === +ev.target.value);
    this.setState({...this.state, students: students.filter(student => student.id !== studentToUpdate.id)});      
    this.props.updateStudent({...studentToUpdate, campusId: null});
        

    }

    render() {
            const {students } = this.state;
            const {onClick} = this;

            return (
                <div className='edit'>
                    <CampusForm {...this.state} {...this} buttonName={'Update Campus'}/>
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

const mapDispatch = (dispatch) => {
    return {
        update: (campus) => dispatch(updateCampus(campus)),
        updateStudent: (student) => dispatch(updateStudent(student))
    }
}
export default connect(null, mapDispatch)(UpdateCampus);
