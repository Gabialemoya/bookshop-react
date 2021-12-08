import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";
import {
  emailSignInStart,
  signInWithGoogle,
  resetAllAuthForms,
  googleSignInStart,
} from "./../../redux/User/user.actions";

import "./signin.scss";
import Buttons from "./../forms/Button/button";
//import {signInWithGoogle} from './../../firebase/utils';

// import AuthWrapp from './../../components/AuthWrapper/authwrapper';
import AuthWrapper from "./../AuthWrapper/authwrapper";
import FormInput from "./../forms/FormInput/forminput";
import { regexEmail } from "../../assets/utils/constant";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const SignIn = (props) => {
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });
  /*  const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); */
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (currentUser) {
      resetForm();
      //dispatch(resetAllAuthForms());
      history.push("/");
    }
  }, [currentUser]); //dependencia a la que se le controla el cambio

  //vaciar formulario
  const resetForm = () => {
    setSignIn({ email: "", password: "" });
  };

  const validationSchema = {
    email: { required: true },
    password: { required: true },
  };

  const isValid = () => {
    let valid = true;
    let errors = {};

    for (let key of Object.keys(signIn)) {
      let value = signIn[key];

      if (validationSchema[key].required) {
        if (value === "") {
          errors[key] = "Campo requerido";
          setErrors(errors);
          valid = false;
        } else {
          if (key === "email" && !value.match(regexEmail)) {
            errors[key] = "Email incorrecto";
            setErrors(errors);
            valid = false;
          }
          if (key === "password" && value.length > 0 && value.length < 6) {
            valid = false;
          }
        }
      }
    }
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      dispatch(
        emailSignInStart({ email: signIn.email, password: signIn.password })
      );
    }
  };

  const handleChange = (e) => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  //funcion para arreglar el problema con sign in con google
  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  //aca le paso el h2 que estaba antes arriba del form
  const configAuthWrapper = {
    headline: "Ingresar",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="email"
            value={signIn.email}
            placeholder="Ingrese su email"
            handleChange={handleChange}
          />
          {errors.email && <p className="error-required">{errors.email}</p>}

          <FormInput
            type="password"
            name="password"
            value={signIn.password}
            placeholder="Ingrese su contraseña"
            handleChange={handleChange}
          />
          {signIn.password.length > 0 && signIn.password.length < 6 && (
            <p className="error-required">
              La contraseña debe contener al menos 6 caracteres.
            </p>
          )}
          {errors.password && (
            <p className="error-required">{errors.password}</p>
          )}

          <Buttons type="submit">Iniciar sesión</Buttons>

          {/* <div className="socialSignin">
            <div className="row">
              <Buttons onClick={handleGoogleSignIn}>
                Iniciar sesión con Google
              </Buttons>
            </div>
          </div> */}

          <div className="links">
            <Link to="/recovery">¿Olvidaste tu contraseña?</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};
export default SignIn;
