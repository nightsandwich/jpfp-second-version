//TODO ADD SCHOOL OPTION
//get added at end of the list - need to be ordered alphaebicalltyadlkfjsdlkf

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addStudent } from './store'
import StudentForm from './StudentForm';

class AddStudent extends Component {
    constructor(props){
        super(props);
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
    onChange(ev){
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }

    async onSubmit(ev){
        const {firstName, lastName, email, imageUrl, gpa, campusId} = this.state;
        ev.preventDefault();
        try{
            await this.props.create({firstName, lastName, email, imageUrl, gpa, campusId});
        } catch (ex){
            console.log(ex);
            this.setState({error: ex.response.data.error});
        }
        this.setState({firstName: '', lastName: '', email: '', imageUrl: '', gpa: '', campusId: ''});    
    }

    render() {
        return (
            <StudentForm {...this.state} {...this} {...this.props} buttonName={'Add Student'}/>

        )
    }
}

const mapDispatch = (dispatch) => {
    return {
        create: (student) => dispatch(addStudent(student))
    }
}
export default connect(({campuses})=> ({campuses}), mapDispatch)(AddStudent);
