import userTypes from './user.types';
import {auth, handleUserProfile, GoogleProvider} from './../../firebase/utils';

//funcion que devuelve un objeto con un type y un payload
export const setCurrentUser= user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
});

export const resetAllAuthForms = () => ({
    type: userTypes.RESET_AUTH_FORMS
});

//funcion asicrona que envia otra funcion
export const signInUser= ({ email, password}) => async dispatch => {
    try{
        await auth.signInWithEmailAndPassword(email, password);
        //success case
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true
        });
    
        }catch(err){
            console.log(err);
        }
};

export const signUpUser = ({ displayName, email, password, confirmPassword}) => async dispatch => {
  if(password !== confirmPassword){
            const err = ['Las contraseñas no coinciden'];
            
            dispatch({
                type: userTypes.SIGN_UP_ERROR,
                payload: err
            });

            return;
        }

        try{

            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, {displayName});

            dispatch({
                type: userTypes.SIGN_UP_SUCCESS,
                payload: true
            });

            //resetear el formulario
            // this.setState({
            //     ...initialState
            // });
            // reset();

            // props.history.push('/');

        }catch(err){
            // console.log(err);
        }  
};

export const resetPassword = ({email}) => async dispatch =>{

    //const {email}=this.state;
    const config ={
        //pagina a la que mandamos al usuario una vez que 
        // modifico la contraseña
        url: 'http://localhost:3000/login'
    };

    try{
            
            // sendPasswordResetEmail recibe el mail del usuario 
            // y el objeto de configuracion (config)
            await auth.sendPasswordResetEmail(email, config)
            // then -> callback
        
            .then(() => { //en el caso que funcione que hace
                console.log('Contraseña modificada con exito');
                dispatch({
                    type: userTypes.RESET_PASSWORD_SUCCESS,
                    payload: true
                });
                // props.history.push('/login'); //redirije al login
            })
            .catch(() => { //en el caso que falle que hace
                console.log('No se pudo cambiar la contraseña');
                const err = ['Cuenta inexistente. Intente de nuevo.'];

                dispatch({
                    type: userTypes.RESET_PASSWORD_ERROR,
                    payload: err
                })
                // this.setState({
                //     errors:err
                // });
                // setErrors(err);
            });

        }catch(err){
            // console.log(err);
        }

}

export const signInWithGoogle = () => async dispatch =>{
    try {
        await auth.signInWithPopup(GoogleProvider)
        .then(() => {
            dispatch({
                type: userTypes.SIGN_IN_SUCCESS,
                payload: true
            });
        });
    } catch (error) {
        console.error();
    }
    
};