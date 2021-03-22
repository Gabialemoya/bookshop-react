import React, {Component} from 'react';
import './signin.scss';
import Buttons from './../forms/Button/button';
import {signInWithGoogle} from './../../firebase/utils';


class SignIn extends Component{

    //esto le saca la funcion al submit del form
    handleSubmit = async e =>{
        e.preventDefault();
    }

    render() {
        return(
            <div className="signin">
                <div className="wrap">
                    <h2>
                        LogIn
                    </h2>
    
                    <div className="formWrap">
                        <form onSubmit={this.handleSubmit}>
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