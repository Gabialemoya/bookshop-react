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
            <h2>
              {errMsg}
            </h2>
          )}
      </div>
    </div>
  );
};

export default Checkout;