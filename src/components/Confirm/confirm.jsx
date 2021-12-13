import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../forms/Button/button";
import confirmIMG from "../../assets/confirm.jpg";
import "./confirm.scss";

const Confirm = () => {
  const history = useHistory();

  const handleHome = () => {
    history.push("/");
  };

  return (
    <div style={{ padding: "0 5%", margin: "30px auto" }}>
      <h1 style={{ textAlign: "center" }}>
        Gracias por comprar!!
        <br />
        <p style={{ fontSize: "20px" }}>
          Te mandamos un mail con la informacion de la compra 📚
        </p>
      </h1>
      <img
        src={confirmIMG}
        alt="Imagen de vuelva prontos"
        height="35%"
        width="35%"
      />
      <Button
        style={{ width: "600px", margin: "20px auto" }}
        onClick={() => handleHome()}
      >
        Ir a Inicio
      </Button>
    </div>
  );
};

export default Confirm;
