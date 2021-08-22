import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword, resetAllAuthForms, resetPasswordStart, resetUserState} from './../../redux/User/user.actions';
import {withRouter, useHistory} from 'react-router-dom';
import Button from '../forms/Button/button';
import FormInput from './../forms/FormInput/forminput';

//import  from 'react';
import { Link } from 'react-router-dom';
import './profiledata.scss';


const ProfileData = props => {
  const { currentUser } = props;
  const { displayName , email} = currentUser;

  const dispatch = useDispatch();
  const history = useHistory();
  //const {resetPasswordSuccess, userErr} = useSelector(mapState);
  const [ setEmail] = useState('');
  const [errors, setErrors] = useState([]);

 


const resetPassword = e =>{
  e.preventDefault(); //previene que se recargue la pagina

  dispatch(resetPasswordStart({email}));
  
}
  return (
    <div className="userProfile">
      
      <form onSubmit={resetPassword}>
        <h3>Nombre Completo: </h3>
            <input
                className="input-form"
                type="text"
                name="displayName"
                value={displayName}
                disabled
                readonly
            />
        <h3>Correo Electrónico: </h3>
            <input
                className="input-form"
                type="email"
                name="email"
                value={email}
                disabled
                readonly
            />

                        <Button className="edit-button" type="submit">
                            Cambiar contraseña
                        </Button>
                    </form>
        
      
      <Button className="edit-button">Editar perfil</Button>
    </div>
  );
}

export default ProfileData;