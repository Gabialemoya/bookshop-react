import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../forms/Button/button";

import "./confirm.scss";

const Confirm = () => {
  const history = useHistory();

  const handleHome = () => {
    history.push("/");
  };

  return (
    <div>
      <h1>
        Gracias por comprar!! Te mandamos un mail con la informacion de la
        compra :)
      </h1>
      <Button onClick={() => handleHome()}>Ir a Inicio</Button>
    </div>
  );
};

export default Confirm;
