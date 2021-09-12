//TODO ADD SCHOOL OPTION


import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateCampus } from './store'

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
    }
   async componentDidMount(){
        this.setState((await axios.get(`/api/campuses/${this.props.match.params.id}`)).data);
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
    //component did update for student deletion????
    destroy(idx){
        this.setState({...this.state, students: students.splice(idx,1)})
    }

    render() {
            const {name, imageUrl, address, description, students} = this.state;
            const {onChange, onSubmit, destroy} = this;

     
            
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
                    students.map((student,idx) => {
                        return (
                            <li key={student.id}>
                                {student.firstName} <button onClick={()=>destroy(idx)}>X</button>
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
    console.log(otherProps);
    const campus = state.campuses.find(campus => campus.id === otherProps.match.params.id * 1) || {}; 
    const students = campus.students;
    return {
        storeCampus: campus,
        storeStudents: students
    }
}

const mapDispatch = (dispatch, {history}) => {
    return {
        update: (campus) => dispatch(updateCampus(campus, history))
    }
}
export default connect(null, mapDispatch)(UpdateCampus);
