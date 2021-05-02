//para recuperar la contraseña
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword, resetAllAuthForms, resetPasswordStart, resetUserState} from './../../redux/User/user.actions';
import {withRouter, useHistory} from 'react-router-dom';
import './emailpassword.scss';

import AuthWrapper from './../AuthWrapper/authwrapper';
import FormInput from './../forms/FormInput/forminput';
import Button from './../forms/Button/button';

//import {auth} from './../../firebase/utils';

const mapState = ({user}) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
});

const EmailPassword = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {resetPasswordSuccess, userErr} = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(resetPasswordSuccess){
            //dispatch(resetAllAuthForms());
            dispatch(resetUserState());
            history.push('/login');
        }
    }, [resetPasswordSuccess]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length >0){
            setErrors(userErr);
        }
    }, [userErr])


    const handleSubmit = e =>{
        e.preventDefault(); //previene que se recargue la pagina

        dispatch(resetPasswordStart({email}));
        
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

export default EmailPassword;
