import React, {Component} from 'react';
import {Switch, Route , Redirect} from 'react-router-dom';
import {auth , handleUserProfile} from './firebase/utils';

//layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

//pages
import Homepage from './pages/Homepage/homepage';
import Registration from './pages/Registration/registration';
import Login from './pages/Login/login';

import './default.scss';

const initialState = {
  currentUser: null
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...initialState
    };
  }

  //hook
//determina con auth si un usuario hizo sign in o no

authLustener = null;

componentDidMount(){
  //subscribed
  this.authLustener = auth.onAuthStateChanged( async userAuth =>{
    if(userAuth) {
      const userRef = await handleUserProfile(userAuth);
      userRef.onSnapshot(snapshot => {
        this.setState({
          currentUser: {
            id: snapshot.id,
            ...snapshot.data()
          }
        })
      })
    }

    this.setState({
      ...initialState
    });
    
    }); 
  }
  

componentWillUnmount(){
  //unsuscribed
  this.authLustener();
}

  render(){
    const{currentUser} = this.state;

    return (
      <div className="App">
       <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout currentUser={currentUser}>
              <Homepage/>
            </HomepageLayout>
          )}/>
          <Route path="/registration" render={() => (
            <MainLayout currentUser={currentUser}>
              <Registration/>
            </MainLayout>
          )}/>
          <Route path="/login" 
            render={() => currentUser ? <Redirect to="/"/> : (
              <MainLayout currentUser={currentUser}>
                <Login/>
              </MainLayout>
          )}/>
        </Switch>
      </div>
    );
  }
}

export default App;
