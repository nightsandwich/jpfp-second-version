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
            description: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
   async componentDidMount(){
         const campus = (await axios.get(`/api/campuses/${this.props.match.params.id}`)).data;
    //     console.log('studentttttttt', student)
        // const {student} = this.props;
        console.log('thisprops', this.props);
        
        this.setState(campus);
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
            const {name, imageUrl, address, description} = this.state;
            const {onChange, onSubmit} = this;
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
                        <button >ADD SCHOOL</button>
                    </form>
                </div>
            );
    }
}
// const mapState = (state, otherProps) => {
//     console.log(otherProps);
//     const campus = state.campuses.find(campus => campus.id === otherProps.match.params.id * 1) || {}; 
//     console.log('campussssss', campus);
//     return {
//         campus: campus
//     }
// }

const mapDispatch = (dispatch, {history}) => {
    return {
        update: (campus) => dispatch(updateCampus(campus, history))
    }
}
export default connect(null, mapDispatch)(UpdateCampus);
