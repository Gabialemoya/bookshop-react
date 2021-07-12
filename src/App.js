import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {checkUserSession} from './redux/User/user.actions';

//components
import AdminToolbar from './components/AdminToolbar/adminToolbar';

//hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

//layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';

//pages
import Homepage from './pages/Homepage/homepage';
import Search from './pages/Search/search';
import Registration from './pages/Registration/registration';
import Login from './pages/Login/login';
import Recovery from './pages/Recovery/recovery';
import Dashboard from './pages/Dashboard/dashboard';
import Admin from './pages/Admin/admin';

import './default.scss';

// const initialState = {
//   currentUser: null
// };

const App = props => {
  
const dispatch = useDispatch();

useEffect(() =>{
  dispatch(checkUserSession());
}, []);

    return (
      <div className="App">
        <AdminToolbar/>
       <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout>
              <Homepage/>
            </HomepageLayout>
          )}/>
          <Route exact path="/search" render={() => (
            <MainLayout>
              <Search/>
            </MainLayout>
          )}/>
          <Route path="/search/:filterType" render={() => (
            <MainLayout>
              <Search/>
            </MainLayout>
          )}/>
          <Route path="/registration" 
          render={() => (
            <MainLayout >
              <Registration/>
            </MainLayout>
          )}/>
          <Route path="/login" 
            render={() => (
              <MainLayout>
                <Login/>
              </MainLayout>
          )}/>
          <Route path="/recovery" render={() => (
            <MainLayout>
              <Recovery/>
            </MainLayout>
          )}
          />
          <Route path="/dashboard" render={() => (
            <WithAuth>
            <DashboardLayout>
              <Dashboard/>
            </DashboardLayout>
            </WithAuth>
          )}
          />
           <Route path="/admin" render={() => (
             <WithAdminAuth>
              <AdminLayout>
                <Admin/>
              </AdminLayout>
            </WithAdminAuth>
          )}
          />
        </Switch>
      </div>
    );
  }
//}

// const mapStateToProps = ({user}) => ({
//   currentUser:user.currentUser
// });

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// });

export default App;
