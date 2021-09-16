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
        )
    }
}

const mapDispatch = (dispatch, {history}) => {
    return {
        create: (campus) => dispatch(addCampus(campus))
    }
}
export default connect(null, mapDispatch)(AddCampus);
