import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, withRouter, useHistory} from 'react-router-dom';
import {emailSignInStart, signInWithGoogle, resetAllAuthForms, googleSignInStart} from './../../redux/User/user.actions';

import './signin.scss';
import Buttons from './../forms/Button/button';
//import {signInWithGoogle} from './../../firebase/utils';

// import AuthWrapp from './../../components/AuthWrapper/authwrapper';
import AuthWrapper from './../AuthWrapper/authwrapper';
import FormInput from './../forms/FormInput/forminput';

const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const SignIn = props => {
    const history = useHistory();
    const {currentUser} = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(currentUser){
            resetForm();
            //dispatch(resetAllAuthForms());
            history.push('/');
        }
    }, [currentUser]); //dependencia a la que se le controla el cambio

    //vaciar formulario
    const resetForm = () =>{
        setEmail('');
        setPassword('');
    }

    const handleSubmit = e =>{
        e.preventDefault();
        dispatch(emailSignInStart({email, password}));
       
    }

    //funcion para arreglar el problema con sign in con google
    const handleGoogleSignIn = () =>{
        dispatch(googleSignInStart());
    }

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
                                    <Buttons onClick={handleGoogleSignIn}>
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
export default SignIn;