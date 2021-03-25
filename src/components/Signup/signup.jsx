import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {signUpUser, resetAllAuthForms} from './../../redux/User/user.actions';
import './signup.scss';

// import {auth, handleUserProfile} from './../../firebase/utils';
import AuthWrapper from './../AuthWrapper/authwrapper';
import FormInput from './../forms/FormInput/forminput';
import Button from './../forms/Button/button';

//object
// const initialState = {
//     displayName: '',
//     email: '',
//     password: '',
//     confirmPassword:'',
//     errors: []
// };

const mapState = ({user}) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
});

const Signup = props => {
    const {signUpSuccess, signUpError} = useSelector(mapState);
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    //hook
    useEffect(() => {
        if(signUpSuccess){
            reset();
            dispatch(resetAllAuthForms());
            props.history.push('/');
        }
    }, [signUpSuccess]);

    useEffect(() => {
        if(Array.isArray(signUpError) && signUpError.length>0){
            setErrors(signUpError);
        }
    }, [signUpError]);

    //vaciar formulario
    const reset = () =>{
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    };
    

   const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(signUpUser({
            displayName,
            email,
            password,
            confirmPassword
        }));
        


    }

    
        //const {displayName, email, password, confirmPassword, errors} = this.state;

        const configAuthWrapper = {
            headline: 'Crear cuenta'
        };

        return(
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">

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

                        <form onSubmit={handleFormSubmit}>
                            <FormInput
                                type="text"
                                name="displayName"
                                value={displayName}
                                placeholder="Ingrese su nombre completo"
                                handleChange={e => setDisplayName(e.target.value)}
                            />
                            <FormInput
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Ingrese su correo electrónico"
                                handleChange={e => setEmail(e.target.value)}
                            />
                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Ingrese una contraseña"
                                handleChange={e => setPassword(e.target.value)}
                            />
                            <FormInput
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                placeholder="Confirme la contraseña"
                                handleChange={e => setConfirmPassword(e.target.value)}
                            />

                            {/* no usar una contraseña demasiado corta porque se rompe */}
                            <Button type="submit">
                                Register
                            </Button>
                        </form>
                    </div>
            </AuthWrapper>
        )
    }
//}

export default withRouter(Signup);
