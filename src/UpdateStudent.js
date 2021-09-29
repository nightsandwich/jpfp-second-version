import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateStudent } from './store'
import StudentForm from './StudentForm';

class UpdateStudent extends Component {
    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            imageUrl: '',
            gpa: '',
            campusId: '',
            error: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
   async componentDidMount(){
       try{
           const student = (await axios.get(`/api/students/${this.props.match.params.id}`)).data || {};
           this.setState(student);
       }
       catch(ex){
           console.log(ex);
       }
    }

    componentDidUpdate(prevProps){
        if (prevProps.campus.id !== this.props.campus.id){
            this.setState({...this.state, campusId: this.props.campus.id})
        }
        console.log(this.state.campusId)
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
            this.setState({error: ex.response.data.error});
        }
    }

    render() {
        return (
            <div className='edit'>
                <StudentForm {...this.state} {...this} {...this.props} buttonName={'Update Student'}/>
            </div>
        )
    }
}
const mapState = (state, otherProps) => {
    const student = state.students.find(student => student.id === otherProps.match.params.id * 1) || {};
    const campus = state.campuses.find(campus => campus.id === student.campusId * 1) || {};
    const campuses = state.campuses;
    return {student, campus, campuses};
}

const mapDispatch = (dispatch) => {
    return {
        update: (student) => dispatch(updateStudent(student))
    }
}
export default connect(mapState, mapDispatch)(UpdateStudent);
