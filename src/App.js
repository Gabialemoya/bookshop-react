import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route , Redirect} from 'react-router-dom';
import {auth , handleUserProfile} from './firebase/utils';
import {setCurrentUser} from './redux/User/user.actions';

//layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

//pages
import Homepage from './pages/Homepage/homepage';
import Registration from './pages/Registration/registration';
import Login from './pages/Login/login';
import Recovery from './pages/Recovery/recovery';

import './default.scss';

// const initialState = {
//   currentUser: null
// };

class App extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     ...initialState
  //   };
  // }

  //hook
//determina con auth si un usuario hizo sign in o no

authLustener = null;

componentDidMount(){

  const {setCurrentUser} = this.props;

  //subscribed
  this.authLustener = auth.onAuthStateChanged( async userAuth =>{
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
  }
  

componentWillUnmount(){
  //unsuscribed
  this.authLustener();
}

  render(){
    const{currentUser} = this.props;

    return (
      <div className="App">
       <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout>
              <Homepage/>
            </HomepageLayout>
          )}/>
          <Route path="/registration" 
          render={() => currentUser ? <Redirect to="/"/> : (
            <MainLayout >
              <Registration/>
            </MainLayout>
          )}/>
          <Route path="/login" 
            render={() => currentUser ? <Redirect to="/"/> : (
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
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser:user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
