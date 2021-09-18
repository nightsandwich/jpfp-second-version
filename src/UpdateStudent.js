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

const mapDispatch = (dispatch) => {
    return {
        update: (student) => dispatch(updateStudent(student))
    }
}
export default connect(({campuses})=> ({campuses}), mapDispatch)(UpdateStudent);
