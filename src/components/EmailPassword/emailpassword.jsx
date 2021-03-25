//para recuperar la contraseña
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword, resetAllAuthForms} from './../../redux/User/user.actions';
import {withRouter} from 'react-router-dom';
import './emailpassword.scss';

import AuthWrapper from './../AuthWrapper/authwrapper';
import FormInput from './../forms/FormInput/forminput';
import Button from './../forms/Button/button';

//import {auth} from './../../firebase/utils';

const mapState = ({user}) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
});

const EmailPassword = props => {
    const {resetPasswordSuccess, resetPasswordError} = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(resetPasswordSuccess){
            dispatch(resetAllAuthForms());
            props.history.push('/login');
        }
    }, [resetPasswordSuccess])

    useEffect(() => {
        if(Array.isArray(resetPasswordError) && resetPasswordError.length >0){
            setErrors(resetPasswordError);
        }
    }, [resetPasswordError])


    const handleSubmit = e =>{
        e.preventDefault(); //previene que se recargue la pagina

        dispatch(resetPassword({email}));
        
    }

    //render(){

        //const {email, errors} = this.state;

        const configAuthWrapper = {
            headline: 'Recuperar Contraseña'
        };

        return(
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">

                    {errors.length > 0 &&(
                        <ul>
                            {errors.map((e, index) => {
                                return(
                                    <li key={index}>
                                        {e}
                                    </li>
                                );
                            })}
                        </ul>
                    )}   

                    <form onSubmit={handleSubmit}>
                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Ingrese su mail"
                            handleChange={e =>setEmail(e.target.value)}
                        />

                        <Button type="submit">
                            Confirmar cambio
                        </Button>
                    </form>
                </div>
            </AuthWrapper>
        );
    }
//}

export default withRouter(EmailPassword);
