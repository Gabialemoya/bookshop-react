import React from 'react';
import {Switch, Route} from 'react-router-dom';

//layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

//pages
import Header from './components/Header/header';
import Homepage from './pages/Homepage/homepage';
import Registration from './pages/Registration/registration';
import './default.scss';

function App() {
  return (
    <div className="App">
     <Switch>
        <Route exact path="/" render={() => (
          <HomepageLayout>
            <Homepage/>
          </HomepageLayout>
        )}/>
        <Route path="/registration" render={() => (
          <MainLayout>
            <Registration/>
          </MainLayout>
        )}/>
      </Switch>
    </div>
  );
}

export default App;
