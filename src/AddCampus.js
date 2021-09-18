import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addCampus } from './store'

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
        const {name, imageUrl, address, description, error} = this.state;
        const {onChange, onSubmit, validate} = this;

        const errors = validate(name, address);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        
        return (
                <form onSubmit={ onSubmit } className='add'>
                    <h3>Add New Campus</h3>
                    <label>Name<sup>*</sup></label>
                    <textarea className={errors.name ? 'error' : ''} rows='1' cols='50' name='name' value={name} onChange={onChange} />
                    <label>Image URL</label>
                    <textarea rows='1' cols='50' name='imageUrl' value={imageUrl} onChange={onChange} />
                    <label>Address<sup>*</sup></label>
                    <textarea className={errors.address ? 'error' : ''} rows='1' cols='50' name='address' value={address} onChange={onChange} />
                    <label>Description</label>
                    <textarea rows='12' cols='50' name='description' value={description} onChange={onChange} />
                    <button disabled={!isEnabled}>Add Campus</button>
                    <br/>
                    <small><sup>*</sup>Required Field</small>
                    <pre className={error ? 'error' : ''}>
                            {
                                !!error && JSON.stringify(error, null, 2)
                            }
                    </pre>
                </form>
        )
    }
}

const mapDispatch = (dispatch) => {
    return {
        create: (campus) => dispatch(addCampus(campus))
    }
}
export default connect(null, mapDispatch)(AddCampus);
