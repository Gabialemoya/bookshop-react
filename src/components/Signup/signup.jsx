import React, {Component} from 'react';
import './signup.scss';

import {auth, handleUserProfile} from './../../firebase/utils';

import FormInput from './../forms/FormInput/forminput';
import Button from './../forms/Button/button';

//object
const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword:'',
    errors: []
};

class Signup extends Component {
    constructor(props){
        super(props);
        this.state ={
            ...initialState
        };

        this.handleChange = this.handleChange.bind(this);
    }

    //metodo para capturar los cambios
    handleChange(e){
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;

        //valodacion de password y confirm password
        if(password !== confirmPassword){
            const err = ['Las contraseñas no coinciden'];
            this.setState({
                errors:err
            });
            return;
        }

        try{

            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, {displayName});

            //resetear el formulario
            this.setState({
                ...initialState
            });

        }catch(err){
            // console.log(err);
        }

    }

    render(){
        const {displayName, email, password, confirmPassword, errors} = this.state;

        return(
            <div className="signup">
                <div className="wrap">
                    <h2>Signup</h2>

                    {errors.length >0 &&(
                        <ul>
                            {errors.map((err, index) => {
                                return(
                                    <li key={index}>
                                        {err}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <div className="formWrap">
                        <form onSubmit={this.handleFormSubmit}>
                            <FormInput
                                type="text"
                                name="displayName"
                                value={displayName}
                                placeholder="Ingrese su nombre completo"
                                onChange={this.handleChange}
                            />
                            <FormInput
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Ingrese su correo electrónico"
                                onChange={this.handleChange}
                            />
                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Ingrese una contraseña"
                                onChange={this.handleChange}
                            />
                            <FormInput
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                placeholder="Confirme la contraseña"
                                onChange={this.handleChange}
                            />

                            {/* no usar una contraseña demasiado corta porque se rompe */}
                            <Button type="submit">
                                Register
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;
