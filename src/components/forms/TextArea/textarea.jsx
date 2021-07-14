import React from 'react';
import './textarea.scss';

const TextArea = ({handleChange, label, ...otherProps }) =>{
    return(
        <div className="formRow">
            {label} 
            <br />
            {label && (
                
                <textarea className="sinopsis" onChange={handleChange} {...otherProps}>
                    
                </textarea>
            )}

            
        </div>
    );
}

export default TextArea;