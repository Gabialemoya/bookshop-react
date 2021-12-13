import {auth} from './../../firebase/utils';

export const handleResetPasswordAPI = (email) => {
    //const {email}=this.state;
    const config ={
        //pagina a la que mandamos al usuario una vez que 
        // modifico la contraseña
        url: 'https://bookshop-react.netlify.app/login'
    };

    return new Promise((resolve, reject) => {
        // sendPasswordResetEmail recibe el mail del usuario 
          // y el objeto de configuracion (config)
          auth.sendPasswordResetEmail(email, config)
          // then -> callback
      
          .then(() => { //en el caso que funcione que hace
             resolve();
              })
              // props.history.push('/login'); //redirije al login
          
          .catch(() => { //en el caso que falle que hace
              //console.log('No se pudo cambiar la contraseña');
              const err = ['Cuenta inexistente. Intente de nuevo.'];
            reject(err);
             
              // this.setState({
              //     errors:err
              // });
              // setErrors(err);
          });

    });
};