import React, {Component} from 'react';
import './signin.scss';
import Buttons from './../forms/Button/button';
import {signInWithGoogle, auth} from './../../firebase/utils';

import FormInput from './../forms/FormInput/forminput';

const initialState = {
    email: '',
    password: ''
};

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...initialState
        };
        //binding
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(e){
        const { name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    //esto le saca la funcion al submit del form
    handleSubmit = async e =>{
        e.preventDefault();
        const {email, password} = this.state;

        try{

            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                ...initialState
            });

        }catch(err){
            // console.log(err);
        }

    }

    render() {

        const {email, password} = this.state;

        return(
            <div className="signin">
                <div className="wrap">
                    <h2>
                        LogIn
                    </h2>
    
                    <div className="formWrap">
                        <form onSubmit={this.handleSubmit}>

                            <FormInput
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Ingrese su email"
                                handleChange={this.handleChange}
                            />

                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Ingrese su contraseña"
                                handleChange={this.handleChange}
                            />

                            <Buttons type="submit">
                                LogIn
                            </Buttons>      

                            

                            <div className="socialSignin">
                                <div className="row">
                                    <Buttons onClick={signInWithGoogle}>
                                        Sign in with Google
                                    </Buttons>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default SignIn;