//para recuperar la contraseña
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  resetAllAuthForms,
  resetPasswordStart,
  resetUserState,
} from "./../../redux/User/user.actions";
import { withRouter, useHistory } from "react-router-dom";
import "./emailpassword.scss";

import AuthWrapper from "./../AuthWrapper/authwrapper";
import FormInput from "./../forms/FormInput/forminput";
import Button from "./../forms/Button/button";

import { regexEmail } from "../../assets/utils/constant";

//import {auth} from './../../firebase/utils';

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr,
});

const EmailPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { resetPasswordSuccess, userErr } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      //dispatch(resetAllAuthForms());
      dispatch(resetUserState());
      history.push("/login");
    }
  }, [resetPasswordSuccess]);

  const isValidField = () => {
    let valid = true;
    let errors = {};

    if (email === "") {
      errors["email"] = "Campo requerido";
      setErrors(errors);
      valid = false;
    } else if (!email.match(regexEmail)) {
      errors["email"] = "Email incorrecto";
      setErrors(errors);
      valid = false;
    }

    return valid;
  };

  /*   useEffect(() => {
        if(Array.isArray(userErr) && userErr.length >0){
            setErrors(userErr);
        }
    }, [userErr]) */

  const handleSubmit = (e) => {
    e.preventDefault(); //previene que se recargue la pagina
    if (isValidField()) {
      dispatch(resetPasswordStart({ email }));
    }
  };
  const configAuthWrapper = {
    headline: "Recuperar Contraseña",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {/* {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return <li key={index}>{e}</li>;
            })}
          </ul>
        )} */}

        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="email"
            value={email}
            placeholder="Ingrese su mail"
            handleChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, [e.target.name]: "" });
            }}
          />
          {errors.email && <p className="error-required">{errors.email}</p>}

          <Button type="submit">Confirmar cambio</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default EmailPassword;
