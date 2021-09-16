import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addCampus } from './store'

export class AddCampus extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            address: '',
            description: ''
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
        ev.preventDefault();
        try{
            await this.props.create(this.state);
        } catch (ex){
            console.log(ex);
//=--------------------add error           
        }
        this.setState({name: '', imageUrl: '', address: '', description: ''});
    }

    render() {
        const {name, imageUrl, address, description} = this.state;
        const {onChange, onSubmit} = this;
//-----------const isDisabled = !name || !address ;
        
        return (
            
                <form onSubmit={ onSubmit } className='add'>
                    Name of School:
                    <textarea rows='1' cols='50' name='name' value={name} onChange={onChange} />
                    Image URL:
                    <textarea rows='1' cols='50' name='imageUrl' value={imageUrl} onChange={onChange} />
                    Address:
                    <textarea rows='1' cols='50' name='address' value={address} onChange={onChange} />
                    Description:
                    <textarea rows='12' cols='50' name='description' value={description} onChange={onChange} />
                    <button >ADD SCHOOL</button>
                </form>
            
        )
    }
}

const mapDispatch = (dispatch, {history}) => {
    return {
        create: (campus) => dispatch(addCampus(campus, history))
    }
}
export default connect(null, mapDispatch)(AddCampus);
