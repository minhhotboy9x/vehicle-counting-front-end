import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './components/Navbar';
import AuthPage from './app/AuthPage';
import Homepage from './app/Homepage';
import Statistic from './app/Statistic';
import Footer from './components/Footer';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [userSession, setUserSession] = useState();
  return (
    <Router>
      <div className="app">
        <GoogleOAuthProvider clientId="745875377237-pqqjaukdkq4tjpta8rqobooi4fk8mfg8.apps.googleusercontent.com">
          <Navigation userSession={userSession} setUserSession={setUserSession}/>
        </GoogleOAuthProvider>

        <Switch>
          <Route exact path="/">
            <Redirect to="/homepage" />
          </Route>

          <Route exact path="/homepage">
            <Homepage />
          </Route>

          <Route exact path="/statistic">
            <Statistic />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
