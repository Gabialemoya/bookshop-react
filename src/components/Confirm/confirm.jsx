import React from 'react';
import { useSelector } from 'react-redux';
import UserProfile from './../UserProfile/userprofile';
import {  useHistory } from 'react-router-dom';
import Button from '../forms/Button/button';

import './confirm.scss';

const mapState = ({user}) => ({
  currentUser: user.currentUser
})
const Confirm = ({children}) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  const handleHome = () => {
    
    history.push('/');
}


  const name = {
    currentUser
  }

  return (
    <div>
      
        <h1>
            Gracias  por comprar!! Te mandamos un mail con la informacion de la compra :) 
        </h1>
      <Button onClick={() => handleHome()}>
        Ir a Inicio
      </Button>
    </div>
  );
}

export default Confirm;