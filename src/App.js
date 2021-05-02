import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {checkUserSession} from './redux/User/user.actions';

//hoc
import WithAuth from './hoc/withAuth';

//layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

//pages
import Homepage from './pages/Homepage/homepage';
import Registration from './pages/Registration/registration';
import Login from './pages/Login/login';
import Recovery from './pages/Recovery/recovery';
import Dashboard from './pages/Dashboard/dashboard';

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
       <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout>
              <Homepage/>
            </HomepageLayout>
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
            <MainLayout>
              <Dashboard/>
            </MainLayout>
            </WithAuth>
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
