//para recuperar la contraseña
import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import './emailpassword.scss';

import AuthWrapper from './../AuthWrapper/authwrapper';
import FormInput from './../forms/FormInput/forminput';
import Button from './../forms/Button/button';

import {auth} from './../../firebase/utils';

// const initialState = {
//     email: '',
//     errors: []
// };

const EmailPassword = props => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);


    // constructor(props){
    //     super(props);
    //     this.state = {
    //         ...initialState
    //     };

    //     this.handleChange=this.handleChange.bind(this);
    // }

    // handleChange(e){
    //     const {name, value} = e.target;
    //     this.setState({
    //         [name]:value
    //     });
    // }

    const handleSubmit = async (e) =>{
        e.preventDefault(); //previene que se recargue la pagina

        try{
            //const {email}=this.state;
            const config ={
                //pagina a la que mandamos al usuario una vez que 
                // modifico la contraseña
                url: 'http://localhost:3000/login'
            };

            // sendPasswordResetEmail recibe el mail del usuario 
            // y el objeto de configuracion (config)
            await auth.sendPasswordResetEmail(email, config)
            // then -> callback
        
            .then(() => { //en el caso que funcione que hace
                console.log('Contraseña modificada con exito');
                props.history.push('/login'); //redirije al login
            })
            .catch(() => { //en el caso que falle que hace
                console.log('No se pudo cambiar la contraseña');
                const err = ['Cuenta inexistente. Intente de nuevo.'];
                // this.setState({
                //     errors:err
                // });
                setErrors(err);
            });

        }catch(err){
            // console.log(err);
        }
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
