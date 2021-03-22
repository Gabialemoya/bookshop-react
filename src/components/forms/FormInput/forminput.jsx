import React from 'react';
import './forminput.scss';

//handleChange para ir guardando los cambios al tipear
const FormInput = ({handleChange, label, ...otherProps }) =>{
    return(
        <div className="formRow">
            {label && (
                <label>
                    {label}
                </label>
            )}

            <input className="formInput" onChange={handleChange} {...otherProps}/>
        </div>
    );
}

export default FormInput;