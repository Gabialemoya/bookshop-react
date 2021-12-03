import React from 'react';
import Button from './../forms/Button/button';
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

                    <h3>Este es un proyecto de Gabriela Moya y Rocío Pepek para la materia Práctica Profesional de la carrera Licenciatura en Informática en la Universidad Nacional del Oeste
                    <br /> <a href="/search">Ir al bookshop</a>
                    </h3>
                   
                    
                </div>
            </div>
        </div>
    );
};

export default Directory;