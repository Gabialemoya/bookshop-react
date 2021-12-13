import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from './../../redux/Cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import './checkout.scss';
import Button from './../forms/Button/button';
import Item from './Item/item';

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

const Checkout = () => {
  const history = useHistory();
  const { cartItems, total } = useSelector(mapState);

  const errMsg = 'No hay libros en tu carrito.';

  return (
    <div className="checkout">
      <h1>
        Mi carrito
      </h1>

      <div className="cart">
        {cartItems.length > 0 ? (
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td>
                  <table className="checkoutHeader" border="0" cellPadding="10" cellSpacing="0">
                    <tbody>
                      <tr>
                        <th>
                            Libro
                        </th>
                        <th>
                            Autor/a
                        </th>
                        <th>
                            Cantidad
                        </th>
                        <th>
                            Precio
                        </th>
                        <th>
                            Eliminar
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table border="0" cellSpacing="0" cellPadding="0">
                    <tbody>
                      {cartItems.map((item, pos) => {
                        return (
                          <tr key={pos}>
                            <td>
                              <Item {...item} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table border="0" cellSpacing="0" cellPadding="0">
                    <tbody>
                      <tr>
                        <td>
                          <table border="0" cellPadding="10" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td>
                                <h3>
                                  Total: ${total}
                                </h3>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table border="0" cellPadding="10" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td>
                                  <Button onClick={() => history.goBack()}>
                                    Seguir comprando
                                  </Button>
                                </td>
                                <td>
                                  <Button onClick={() => history.push('/payment')}>
                                    Confirmar compra
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className='error'>
              <h2>
              {errMsg}
            </h2>
            <img src="data:image/jpeg;base64,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" alt="" />
            <Button onClick={() => history.goBack()}>Volver</Button>
          </div>
            
          )}
      </div>
    </div>
  );
};

export default Checkout;