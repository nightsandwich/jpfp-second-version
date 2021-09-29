import React from "react";

const CampusForm = ({name, imageUrl, address, description, error, onChange, onSubmit, buttonName}) => {
    const validate = (name, address) => {
        return {
            name: !name.length,
            address: !address.length
        }
    }

    const errors = validate(name, address);
    const isEnabled = !Object.keys(errors).some(x => errors[x]);
    return (
        <form onSubmit={ onSubmit } className='add'>
            <h3>{buttonName}</h3>
            <label>Name<sup>*</sup></label>
            <textarea className={errors.name ? 'error' : ''} rows='1' cols='50' name='name' value={name} onChange={onChange} />
            <label>Image URL</label>
            <textarea rows='1' cols='50' name='imageUrl' value={imageUrl} onChange={onChange} />
            <label>Address<sup>*</sup></label>
            <textarea className={errors.address ? 'error' : ''} rows='1' cols='50' name='address' value={address} onChange={onChange} />
            <label>Description</label>
            <textarea rows='12' cols='50' name='description' value={description} onChange={onChange} />
            <button disabled={!isEnabled}>{buttonName}</button>
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

export default CampusForm;