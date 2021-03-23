import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import './signup.scss';

import {auth, handleUserProfile} from './../../firebase/utils';
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

const Signup = props => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    //vaciar formulario
    const reset = () =>{
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    };

    // constructor(props){
    //     super(props);
    //     this.state ={
    //         ...initialState
    //     };

    //     this.handleChange = this.handleChange.bind(this);
    // }

    //metodo para capturar los cambios
    // handleChange(e){
    //     const {name, value} = e.target;

    //     this.setState({
    //         [name]: value
    //     });
    // }

   const handleFormSubmit = async event => {
        event.preventDefault();
        //const {displayName, email, password, confirmPassword} = this.state;

        //valodacion de password y confirm password
        if(password !== confirmPassword){
            const err = ['Las contraseñas no coinciden'];
            // this.setState({
            //     errors:err
            // });
            setErrors(err);
            return;
        }

        try{

            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, {displayName});

            //resetear el formulario
            // this.setState({
            //     ...initialState
            // });
            reset();

            props.history.push('/');

        }catch(err){
            // console.log(err);
        }

    }

    //render(){
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
