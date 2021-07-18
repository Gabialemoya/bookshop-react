import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import FormInput from '../../components/forms/FormInput/forminput';
import Button from '../../components/forms/Button/button';
import { CountryDropdown } from 'react-country-region-selector';
import { apiInstance } from '../../Utils/utils';
//import { selectCartTotal } from '../../redux/Cart/cart.selectors';
//import { createStructuredSelector } from 'reselect';
import { useSelector , useDispatch} from 'react-redux';

//datos carrito
import { clearCart } from '../../redux/Cart/cart.actions';
import { selectCartItems, selectCartTotal , selectCartItemsCount} from './../../redux/Cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

//email
import emailjs from 'emailjs-com';

import './paymentdetails.scss';
//import { functionExpression } from '@babel/types';



const initialAddressState = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
}


const mapState = createStructuredSelector({
    total: selectCartTotal,
    itemCount: selectCartItemsCount,
    cartItems: selectCartItems,
  });
  

const PaymentDetails = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { total, itemCount, cartItems } = useSelector(mapState);
    const [recipientName, setRecipientName] = useState('');
    const [recipientMail, setRecipientMail] = useState('');
    const [line1, setLine1] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [postal_code, setPostal_Code] = useState('');
    const [country, setCountry] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    

    // const stripe = useStripe();
    // const elements = useElements();
    //const {total, itemCount} = useSelector(mapState);
    // const [billingAddress, setBillingAdress] = useState({...initialAddressState});
     const [shippingAddress, setShippingAdress] = useState({...initialAddressState});
    // const [recipientName, setRecipientName] = useState('');
    // const [nameOnCard, setNameOnCard] = useState('');

    useEffect(() => {
        if(itemCount<1){
            history.push('/');
        }
    }, [itemCount]);

    const handleShipping = e => {
        const {name, value} = e.target;
        setShippingAdress({
            ...shippingAddress,
            [name]: value
        });
    };

    // const handleBilling = e => {
    //     const {name, value} = e.target;
    //     setBillingAdress({
    //         ...billingAddress,
    //         [name]: value
    //     });
    // };

    const sendEmail = async e =>{
        e.preventDefault();
    
        emailjs.sendForm('gmail', 'template_kxfrt04', e.target, 'user_h5yxuThnXFLMgSHZkIOFX')
          .then((result) => {
              dispatch(
                  clearCart()
              )
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset();
          dispatch(
            clearCart()
        )
          history.push('/confirm');
    } 
    const resetForm = () => {
        setRecipientName('');
        setRecipientMail('');
        setLine1('');
        setState('');
        setCity('');
        setPostal_Code('');
        setCountry('');
        setNameOnCard('');
    }
    const handleFormSubmit = async evt => {
//         evt.preventDefault();
    

//     apiInstance.post('/payments/create', {
//       amount: total * 100,
//       shipping: {
//         name: recipientName,
//         address: {
//           ...shippingAddress
//         }
//       }
//     }).then(({ data: clientSecret }) => {

//       stripe.createPaymentMethod({
//         type: 'card',
//         card: cardElement,
//         billing_details: {
//           name: nameOnCard,
//           address: {
//             ...billingAddress
//           }
//         }
//       }).then(({ paymentMethod }) => {

//         stripe.confirmCardPayment(clientSecret, {
//           payment_method: paymentMethod.id
//         })
//         .then(() => {

//           const configOrder = {
//             orderTotal: total,
//             orderItems: cartItems.map(item => {
//               const { documentID, productThumbnail, productName,
//                 productPrice, quantity } = item;

//               return {
//                 documentID,
//                 productThumbnail,
//                 productName,
//                 productPrice,
//                 quantity
//               };
//             })
//           }

//           dispatch(
//             saveOrderHistory(configOrder)
//           );
//         });

//       })


//     });

//   };
    };

    const configCardElement = {
        iconStyle: 'solid',
        style: {
            base: {
                fontSize: '16px'
            }
        },
        hidePostalCode: true
    };


    return(
        <div className="paymentDetails">
            <form onSubmit={sendEmail}>
                <div className="group">
                    <h2>
                        Direccion de Envio
                    </h2>
                    <FormInput 
                        required
                        placeholder="Nombre del destinatario"
                        name="recipientName"
                        handleChange={e => setRecipientName(e.target.value)}
                        value={recipientName}
                        type="text"
                    />

                    <FormInput 
                        required
                        placeholder="Mail del destinatario"
                        name="recipientMail"
                        handleChange={e => setRecipientMail(e.target.value)}
                        value={recipientMail}
                        type="email"
                    />

                    <FormInput 
                        required
                        placeholder="Direccion"
                        name="line1"
                        handleChange={e => setLine1(e.target.value)}
                        value={line1}
                        type="text"
                    />

                   
                    <FormInput 
                        required
                        placeholder="Ciudad"
                        name="city"
                        handleChange={e => setCity(e.target.value)}
                        value={city}
                        type="text"
                    />

                    <FormInput
                        required 
                        placeholder="Provincia"
                        name="state"
                        handleChange={e => setState(e.target.value)}
                        value={state}
                        type="text"
                    />

                    <FormInput 
                        required
                        placeholder="Codigo postal"
                        name="postal_code"
                        handleChange={e => setPostal_Code(e.target.value)}
                        value={postal_code}
                        type="text"
                    />
                    <div className="formRow checkoutInput">
                        <CountryDropdown
                            required
                            onChange= {val => handleShipping ({
                                target: {
                                    name: 'country',
                                    value: val
                                }
                            })}
                            defaultOptionLabel='Seleccionar pais'
                            value={shippingAddress.country}
                            valueType="short"
                        />
                    </div>                                        
                </div>
              
                <div className="group">
                    <h2>
                        Datos de tarjeta
                    </h2>
                    <CardElement
                        options={configCardElement}
                    />
                </div>

                <Button type="submit">
                    Comprar
                </Button>

            </form>
        </div>
    );
}

export default PaymentDetails;