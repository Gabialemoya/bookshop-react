import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';

import './signin.scss';
import Buttons from './../forms/Button/button';
import {signInWithGoogle, auth} from './../../firebase/utils';

// import AuthWrapp from './../../components/AuthWrapper/authwrapper';
import AuthWrapper from './../AuthWrapper/authwrapper';
import FormInput from './../forms/FormInput/forminput';

// const initialState = {
//     email: '',
//     password: ''
// };

const SignIn = props => {
    //AL NO SER UNA CLASE YA NO HACE FALTA
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         ...initialState
    //     };
    //     //binding
    //     this.handleChange = this.handleChange.bind(this);
        
    // }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //vaciar formulario
    const resetForm = () =>{
        setEmail('');
        setPassword('');
    }

    
    //SE REEMPLAZA POR REACT HOOKS
    // handleChange(e){
    //     const { name, value} = e.target;
    //     this.setState({
    //         [name]: value
    //     });
    // }

    //esto le saca la funcion al submit del form
    const handleSubmit = async e =>{
        e.preventDefault();
        //const {email, password} = this.state;

        try{

            await auth.signInWithEmailAndPassword(email, password);
            // this.setState({
            //     ...initialState
            // });
            resetForm();

            props.history.push('/');


        }catch(err){
            // console.log(err);
        }

    }

    

        //const {email, password} = this.state;

        //aca le paso el h2 que estaba antes arriba del form
        const configAuthWrapper = {
            headline: 'Inicia sesion'
        };

        return(
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">
                        <form onSubmit={handleSubmit}>

                            <FormInput
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Ingrese su email"
                                handleChange={e => setEmail(e.target.value)}
                            />

                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Ingrese su contraseña"
                                handleChange={e => setPassword(e.target.value)}
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

                            <div className="links">
                                <Link to='/recovery'>
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                        </form>
                    </div>
            </AuthWrapper>
        );
    
}
export default withRouter(SignIn);