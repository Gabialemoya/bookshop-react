import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUpUserStart } from "./../../redux/User/user.actions";
import "./signup.scss";

import AuthWrapper from "./../AuthWrapper/authwrapper";
import FormInput from "./../forms/FormInput/forminput";
import Button from "./../forms/Button/button";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  useErr: user.useErr,
});

const Signup = (props) => {
  const history = useHistory();
  const { currentUser, useErr } = useSelector(mapState);
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  //hook
  useEffect(() => {
    if (currentUser) {
      reset();
      history.push("/");
    }
  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(useErr) && useErr.length > 0) {
      setErrors(useErr);
    }
  }, [useErr]);

  //vaciar formulario
  const reset = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(
      signUpUserStart({
        displayName,
        email,
        password,
        confirmPassword,
      })
    );
    sendEmail(event);
    event.target.reset();
  };

  const sendEmail = (e) => {

    emailjs
      .sendForm(
        "gmail",
        "template_lb3ie7k",
        e.target,
        "user_PqBRce5EDpXMks8EICz3g"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const configAuthWrapper = {
    headline: "Crear cuenta",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        )}

        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Ingrese su nombre completo"
            handleChange={(e) => setDisplayName(e.target.value)}
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Ingrese su correo electrónico"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Ingrese una contraseña"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirme la contraseña"
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* no usar una contraseña demasiado corta porque se rompe */}
          <Button type="submit">Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};
//}

export default Signup;
