import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {signOutUserStart} from './../../redux/User/user.actions';
import Logo from './../../assets/logo.png'
import './header.scss';
import {Link} from 'react-router-dom';
//import {auth} from './../../firebase/utils.js';

const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const Header = props =>{
    const dispatch = useDispatch();
    const{currentUser} = useSelector(mapState);

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
                    {currentUser && (
                       <ul>  
                            <li>
                            <Link to="/dashboard">
                                Mi perfil
                            </Link>
                        </li>
                           <li>
                               <span onClick={() => signOut()}>
                                   Logout
                               </span>
                           </li>
                       </ul> 
                    )}

                    {!currentUser && (
                    <ul>
                        {/* <li>
                            <Link to="/dashboard">
                                Dashboard
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/registration">
                                Register
                            </Link>
                        </li>
                        <li>
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                    )}
                    
                </div>
            </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null
};



export default Header;