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
        this.validate = this.validate.bind(this);
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

    validate(firstName, lastName, campusId, email, gpa){
        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        const validGpa = new RegExp('^[0-3]+(.[0-9]{0,1})?$|^4+(.[0]{0,1})?$');
        
        return {
            firstName: !firstName.length,
            lastName: !lastName.length,
            email: !email.length || !validEmail.test(email),
            gpa: !gpa.length || !validGpa.test(gpa),
            campusId: !campusId
        }
    }

    render() {
        const {firstName, lastName, email, gpa, campusId} = this.state;
        const {validate} = this;

        const errors = validate(firstName, lastName, campusId, email, gpa);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);

        return (
            <div className='edit'>
                <StudentForm {...this.state} {...this} {...this.props} errors={errors} isEnabled={isEnabled} buttonName={'Update Student'}/>
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
