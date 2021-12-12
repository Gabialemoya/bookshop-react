import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import FormInput from "../../components/forms/FormInput/forminput";
import Button from "../../components/forms/Button/button";
import { CountryDropdown } from "react-country-region-selector";
import { saveOrderHistory } from "../../redux/Orders/orders.actions";
import { useSelector, useDispatch } from "react-redux";
import { regexEmail } from "../../assets/utils/constant";

//datos carrito
import { clearCart } from "../../redux/Cart/cart.actions";
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount,
} from "./../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";

//email
import emailjs from "emailjs-com";

import "./paymentdetails.scss";

const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "Argentina",
};

const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
  cartItems: selectCartItems,
});

const PaymentDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { total, itemCount, cartItems } = useSelector(mapState);
  const [recipientName, setRecipientName] = useState("");
  const [recipientMail, setRecipientMail] = useState("");
  const [line1, setLine1] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postal_code, setPostal_Code] = useState("");

  const [shippingAddress, setShippingAdress] = useState({
    ...initialAddressState,
  });
  const [errors, setErrors] = useState([]);

  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    if (itemCount < 1) {
      history.push("/dashboard");
    }
  }, [itemCount]);

  const isValidField = () => {
    let obj = { recipientName, recipientMail, line1, state, city, postal_code };
    let valid = true;
    let errors = {};

    for (let key in obj) {
      if (obj[key] === "") {
        errors[key] = "Campo requerido";
        setErrors(errors);
        valid = false;
      } else if (key === "recipientMail" && !obj[key].match(regexEmail)) {
        errors[key] = "Email incorrecto";
        setErrors(errors);
        valid = false;
      } else if (key === "line1" && !obj[key].match(/\d{2}/g)) {
        errors[key] = "La direccion debe contener al menos dos numeros";
        setErrors(errors);
        valid = false;
      } else if (
        key === "postal_code" &&
        !obj[key].match(/^\d{4}|[A-Za-z]\d{4}[a-zA-Z]{3}$/g)
      ) {
        errors[key] = "El codigo postal debe contener al menos cuatro numeros";
        setErrors(errors);
        valid = false;
      }

      if (shippingAddress.country === "") {
        errors["country"] = "Campo requerido";
        setErrors(errors);
        valid = false;
      }
    }

    return valid;
  };

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAdress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const itemsArr = () => {
    let auxArr = [];
    cartItems.forEach((item) => {
      const { productName, quantity } = item;
      auxArr.push(`${quantity} ${productName}`);
    });
    return `<ul>${items(auxArr)}</ul>`;
  };

  const items = (auxArr) => {
    return auxArr.map((item) => {
      return `<li>${item}</li>`;
    });
  };

  const configOrder = {
    orderTotal: total,
    orderItems: cartItems.map((item) => {
      const { documentID, productName, productAuthor, productPrice, quantity } =
        item;

      return {
        documentID,
        productName,
        productAuthor,
        productPrice,
        quantity,
      };
    }),
    orderDescription: itemsArr(),
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (isValidField()) {
      if (!stripe || !elements) return;

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      if (error) {
        setErrors({ ...errors, cardElement: "Campo requerido" });
        console.log(error);
      } else {
        console.log(paymentMethod);
        const info = e.target;
        console.log("INFO", info);

        console.log("ORDEN", configOrder);

        emailjs
          .sendForm(
            "gmail",
            "template_af1451q",
            info,
            "user_PqBRce5EDpXMks8EICz3g"
          )
          .then(
            (result) => {
              dispatch(clearCart());
            },
            (err) => {
              console.log(err.text);
            }
          );
        e.target.reset();

        dispatch(saveOrderHistory(configOrder));
        history.push("/confirm");
      }
    }
  };

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="paymentDetails">
      <form onSubmit={sendEmail}>
        <div className="group">
          <h2>Direccion de Envio</h2>
          <FormInput
            placeholder="Nombre del destinatario"
            name="recipientName"
            handleChange={(e) => {
              setRecipientName(e.target.value);
              setErrors({ ...errors, [e.target.name]: "" });
            }}
            value={recipientName}
            type="text"
          />
          {errors.recipientName && (
            <p className="error-required">{errors.recipientName}</p>
          )}

          <FormInput
            placeholder="Mail del destinatario"
            name="recipientMail"
            handleChange={(e) => {
              setRecipientMail(e.target.value);
              setErrors({ ...errors, [e.target.name]: "" });
            }}
            value={recipientMail}
            type="text"
          />
          {errors.recipientMail && (
            <p className="error-required">{errors.recipientMail}</p>
          )}

          <FormInput
            placeholder="Direccion"
            name="line1"
            handleChange={(e) => {
              setLine1(e.target.value);
              setErrors({ ...errors, [e.target.name]: "" });
            }}
            value={line1}
            type="text"
          />
          {errors.line1 && <p className="error-required">{errors.line1}</p>}

          <FormInput
            placeholder="Ciudad"
            name="city"
            handleChange={(e) => {
              setCity(e.target.value);
              setErrors({ ...errors, [e.target.name]: "" });
            }}
            value={city}
            type="text"
          />
          {errors.city && <p className="error-required">{errors.city}</p>}

          <FormInput
            placeholder="Provincia"
            name="state"
            handleChange={(e) => {
              setState(e.target.value);
              setErrors({ ...errors, [e.target.name]: "" });
            }}
            value={state}
            type="text"
          />
          {errors.state && <p className="error-required">{errors.state}</p>}

          <FormInput
            placeholder="Codigo postal"
            name="postal_code"
            handleChange={(e) => {
              setPostal_Code(e.target.value);
              setErrors({ ...errors, [e.target.name]: "" });
            }}
            value={postal_code}
            type="text"
          />
          {errors.postal_code && (
            <p className="error-required">{errors.postal_code}</p>
          )}

          <input
            style={{ display: "none" }}
            name="total"
            readOnly
            value={configOrder.orderTotal}
          />
          <textarea
            style={{ display: "none" }}
            name="individual"
            readOnly
            value={configOrder.orderDescription}
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
              onChange={(val) => {
                setErrors({ ...errors, country: "" });
                handleShipping({
                  target: {
                    name: "country",
                    value: val,
                  },
                });
              }}
              defaultOptionLabel={shippingAddress.country}
              value={shippingAddress.country}
              valueType="short"
            />
            {errors.country && (
              <p className="error-required">{errors.country}</p>
            )}
          </div>
        </div>

        <div className="group">
          <h2>Datos de tarjeta</h2>
          <CardElement id="card-element" options={configCardElement} />
        </div>

        <Button type="submit">Comprar</Button>
        <Button onClick={() => history.goBack()}>Volver al carrito</Button>
      </form>
    </div>
  );
};

export default PaymentDetails;
