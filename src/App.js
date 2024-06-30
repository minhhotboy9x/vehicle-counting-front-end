import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './components/Navbar';
import Homepage from './app/Homepage';
import Statistic from './app/Statistic';
import Footer from './components/Footer';
import AuthPage from './app/AuthPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from './config/config.js';

function App() {
  const [userSession, setUserSession] = useState();
  useEffect(() => {
    setUserSession(JSON.parse(localStorage.getItem("userSession")));
  }, []);
  return (
    <Router>
      <div className="app">
        {userSession && <GoogleOAuthProvider clientId={config.CLIENTID}>
          <Navigation userSession={userSession} setUserSession={setUserSession} />
        </GoogleOAuthProvider>
        }
        <Switch>
          <Route exact path="/">
            {userSession ? <Redirect to="/homepage" /> :
              <GoogleOAuthProvider clientId={config.CLIENTID}>
                <AuthPage setUserSession={setUserSession} />
              </GoogleOAuthProvider>
            }
          </Route>
          <Route exact path="/homepage">
            {userSession ? <Homepage /> : <Redirect to="/" />}
          </Route>

          <Route exact path="/statistic">
            {userSession ? <Statistic /> : <Redirect to="/" />}
          </Route>
        </Switch>

        {userSession && <Footer />}
      </div>
    </Router>
  );
}

export default App;
