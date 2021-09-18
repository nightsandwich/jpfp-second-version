import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addCampus } from './store'
import CampusForm from './CampusForm';

class AddCampus extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            address: '',
            description: '',
            error: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    onChange(ev){
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }
    
    async onSubmit(ev){
        const {name, imageUrl, address, description} = this.state;
        ev.preventDefault();
        try{
            await this.props.create({name, imageUrl, address, description});
        } catch (ex){
            console.log(ex);
            this.setState({error: ex.response.data.error});       
        }
        this.setState({name: '', imageUrl: '', address: '', description: ''});
    }
    
    validate(name, address){
        return {
            name: !name.length,
            address: !address.length
        }
    }


    render() {
        const {name, address} = this.state;
        const {validate} = this;

        const errors = validate(name, address);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        
        return (
            <CampusForm {...this.state} {...this} errors={errors} isEnabled={isEnabled} buttonName={'Add Campus'}/>
        )
    }
}

const mapDispatch = (dispatch) => {
    return {
        create: (campus) => dispatch(addCampus(campus))
    }
}
export default connect(null, mapDispatch)(AddCampus);
