import React from 'react';
import Clasicos from './../../assets/clasicos.JPG';
import './directory.scss';

const Directory = props =>{
    return(
        <div className='directory'>
            <div className="wrap">
                <div
                className='item'
                style={
                    {
                        backgroundImage: `url(${Clasicos})`
                    }
                }>
                    <a href="/">
                        Ir al Bookshop
                    </a>
                </div>
                {/* <div
                className='item'
                style={
                    {
                        backgroundImage: `url(${Terror})`
                    }
                }>
                     <a href="hhh">
                        Shop Terror
                    </a>
                    
                </div> */}
            </div>
        </div>
    );
};

export default Directory;