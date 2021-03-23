import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Switch, Route , Redirect} from 'react-router-dom';
import {auth , handleUserProfile} from './firebase/utils';
import {setCurrentUser} from './redux/User/user.actions';

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
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     ...initialState
  //   };
  // }

  //hook
//determina con auth si un usuario hizo sign in o no

//authLustener = null;

// useEffect va cargando el codigo entre llaves cada vez que el valor entre [] cambia

const {setCurrentUser, currentUser} = props;

useEffect(() => {

  //subscribed
  const authLustener = auth.onAuthStateChanged( async userAuth =>{
    if(userAuth) {
      const userRef = await handleUserProfile(userAuth);
      userRef.onSnapshot(snapshot => {
        setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
        });
      })
    }

    // this.setState({
    //   ...initialState
    // });

    setCurrentUser(userAuth);
    
    }); 

  return() => {
    //unsuscribed
     authLustener();
  };
}, []);


  //render(){
    //const{currentUser} = this.props;

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

const mapStateToProps = ({user}) => ({
  currentUser:user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
