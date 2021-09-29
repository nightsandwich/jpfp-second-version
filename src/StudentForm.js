import React from "react";

const StudentForm = ({firstName, lastName, email, imageUrl, gpa, campusId, campuses, error, onChange, onSubmit, buttonName}) => {    
    
    const validate = (firstName, lastName, campusId, email, gpa) => {
        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        const validGpa = new RegExp('^[0-3]+(.[0-9]{0,1})?$|^4+(.[0]{0,1})?$');
        
        return {
            firstName: !firstName.length,
            lastName: !lastName.length,
            email: !email.length || !validEmail.test(email),
            gpa: !gpa.length || !validGpa.test(gpa),
            
        }
    }

    const errors = validate(firstName, lastName, campusId, email, gpa);
    const isEnabled = !Object.keys(errors).some(x => errors[x]);
    
    console.log('campusID, ',campusId);
    return (
        <form onSubmit={ onSubmit } className='add'>
            <h3>{buttonName}</h3>
            <label>First Name<sup>*</sup></label>
            <textarea className={errors.firstName ? 'error' : ''} rows='1' cols='50' name='firstName' value={firstName} onChange={onChange} />
            <label>Last Name<sup>*</sup></label>
            <textarea className={errors.lastName ? 'error' : ''} rows='1' cols='50' name='lastName' value={lastName} onChange={onChange} />
            <label>Email<sup>*</sup> <small className='errormessage'>{errors.email ? '---Please enter a valid email address---' : ''}</small></label>
            <textarea className={errors.email ? 'error' : ''} rows='1' cols='50' name='email' value={email} onChange={onChange} />
            <label>Image URL</label>
            <textarea rows='1' cols='50' name='imageUrl' value={imageUrl} onChange={onChange} />
            <label>Campus<sup>*</sup></label>
            <select className={errors.campusId ? 'error' : ''} name='campusId' onChange={onChange} value={campusId}>
                <option name='campusId' onChange={onChange} value={null || undefined}>SELECT CAMPUS</option>
                {
                    campuses.map( campus => { 
                        return (
                        <option value={ campus.id } key={ campus.id } >
                            {campus.name}
                        </option>
                        );
                    })
                }
            </select>
            <label>GPA<sup>*</sup><small className='errormessage'>{errors.gpa ? '---GPA should be between 0.0 and 4.0---' : ''}</small></label>
            <textarea className={errors.gpa ? 'error' : ''} rows='1' cols='50' name='gpa' value={gpa} onChange={onChange} />
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

export default StudentForm;