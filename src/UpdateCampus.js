
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
            students: [],
            error: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
        this.validate = this.validate.bind(this);
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
    
    validate(name, address){
        return {
            name: !name.length,
            address: !address.length
        }
    }

    onClick(ev){
    const {students} = this.state;
    this.setState({...this.state, students: students.filter(student => student.id !== ev.target.value * 1)});      
    this.props.deleteStudentSchool(ev.target.value * 1);
        

    }

    render() {
            const {name, imageUrl, address, description, students, error} = this.state;
            const {onChange, onSubmit, onClick, validate} = this;
            
            const errors = validate(name, address);
            const isEnabled = !Object.keys(errors).some(x => errors[x]);

            return (
                <div className='edit'>
                    <form onSubmit={ onSubmit } className='add' >
                        <h3>Edit Campus Information</h3>
                        <label>Name<sup>*</sup></label>
                        <textarea className={errors.name ? 'error' : ''} rows='1' cols='50' name='name' value={name} onChange={onChange} />
                        <label>Image URL</label>
                        <textarea rows='1' cols='50' name='imageUrl' value={imageUrl} onChange={onChange} />
                        <label>Address<sup>*</sup></label>
                        <textarea className={errors.address ? 'error' : ''} rows='1' cols='50' name='address' value={address} onChange={onChange} />
                        <label>Description</label>
                        <textarea rows='12' cols='50' name='description' value={description} onChange={onChange} />
                        <br/>
                        <button disabled={!isEnabled}>Update Campus Info</button>
                        <small><sup>*</sup>Required Field</small>
                        <pre className={error ? 'error' : ''}>
                                {
                                    !!error && JSON.stringify(error, null, 2)
                                }
                        </pre>
                    </form>
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
        deleteStudentSchool: (id) => dispatch(deleteStudentSchool(id))
    }
}
export default connect(null, mapDispatch)(UpdateCampus);
