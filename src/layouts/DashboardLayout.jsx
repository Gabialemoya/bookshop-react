import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUserStart } from './../redux/User/user.actions';

import Header from './../components/Header/header';
import VerticalNav from './../components/VerticalNav/verticalnav';
import Footer from './../components/Footer/footer';

const DashBoardLayout = props => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <div className="dashboardLayout">
      <Header {...props} />
      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <ul>
              <li>
                <Link to="/dashboard/profile">
                  Mis datos
                </Link>
              </li>
              <li>
                <Link to="/dashboard/history">
                    Historial de compras
                  </Link>
                </li>
              <li>
                <span className="signOut" onClick={() => signOut()}>
                  Cerrar Sesión
                </span>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className="content">
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoardLayout;