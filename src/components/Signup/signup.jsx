import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUpUserStart } from "./../../redux/User/user.actions";
import "./signup.scss";
import { regexEmail } from "../../assets/utils/constant";

import AuthWrapper from "./../AuthWrapper/authwrapper";
import FormInput from "./../forms/FormInput/forminput";
import Button from "./../forms/Button/button";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const Signup = () => {
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      reset();
      history.push("/");
    }
  }, [currentUser, history]);

  /* useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    } else {
      setErrors([]);
    }
  }, [userErr]); */

  const isValidField = () => {
    let obj = { displayName, email, password, confirmPassword };
    let valid = true;
    let errors = {};

    for (let key in obj) {
      if (obj[key] === "") {
        errors[key] = "Campo requerido";
        setErrors(errors);
        valid = false;
      } else {
        if (key === "email" && !obj[key].match(regexEmail)) {
          errors[key] = "Email incorrecto";
          setErrors(errors);
          valid = false;
        }
        if (key === "password" && obj[key].length > 0 && obj[key].length < 6) {
          /* errors[key] = "La contraseña debe contener al menos 6 caracteres";
          setErrors(errors); */
          valid = false;
        }
        if (key === "confirmPassword" && obj[key] !== password) {
          errors[key] = "Las contraseñas no coinciden";
          setErrors(errors);
          valid = false;
        }
      }
    }

    return valid;
  };

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
    if (isValidField()) {
      dispatch(
        signUpUserStart({
          displayName,
          email,
          password,
          confirmPassword,
        })
      );
      sendEmail(event);
      reset();
    }
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
    headline: "Registrarse",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Ingrese su nombre completo"
            handleChange={(e) => {
              setDisplayName(e.target.value);
              setErrors({ ...errors, [e.target.name]: "" });
            }}
          />
          {errors.displayName && (
            <p className="error-required">{errors.displayName}</p>
          )}
          <FormInput
            type="text"
            name="email"
            value={email}
            placeholder="Ingrese su correo electrónico"
            handleChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, [e.target.name]: "" });
            }}
          />
          {errors.email && <p className="error-required">{errors.email}</p>}
          <FormInput
            type="password"
            name="password"
            value={password}
            min="6"
            placeholder="Ingrese una contraseña"
            handleChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, [e.target.name]: "" });
            }}
          />
          {password.length > 0 && password.length < 6 && (
            <p className="error-required">
              La contraseña debe contener al menos 6 caracteres.
            </p>
          )}
          {errors.password && (
            <p className="error-required">{errors.password}</p>
          )}
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            min="6"
            placeholder="Confirme la contraseña"
            handleChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors({ ...errors, [e.target.name]: "" });
            }}
          />
          {errors.confirmPassword && (
            <p className="error-required">{errors.confirmPassword}</p>
          )}
          <Button type="submit">Crear cuenta</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default Signup;
