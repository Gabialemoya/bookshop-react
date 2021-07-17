import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {signOutUserStart} from './../../redux/User/user.actions';
import Logo from './../../assets/logo.png';
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors';
import './header.scss';
import {Link} from 'react-router-dom';
//import {auth} from './../../firebase/utils.js';

const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)
});

const Header = props =>{
    const dispatch = useDispatch();
    const{currentUser, totalNumCartItems} = useSelector(mapState);
    //const{currentUser} = useSelector(mapState);

    const signOut = () => {
        dispatch(signOutUserStart());
    };

    return(
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Logo"/>
                    </Link>         
                </div>

                <nav>
                    <ul>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/search">
                                Buscar libro
                            </Link>
                        </li>
                    </ul>
                </nav>


                <div className="callToActions">
                    <ul>
                        <li>
                            <Link to="/cart">
                                Mi Carrito ({totalNumCartItems})
                            </Link>
                        </li>

                        {currentUser && [
                            <li>
                                <Link to="/dashboard">
                                            Mi perfil
                                </Link>
                            </li>,
                            <li>
                                <span onClick={() => signOut()}>
                                    Logout
                                </span>
                            </li>
                        ]}

                        {!currentUser && [
                            <li>
                                <Link to="/registration">
                                    Register
                                </Link>
                            </li>,
                            <li>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>   
                        ]}
                    </ul>


                    

                    
                    
                </div>
            </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null
};



export default Header;