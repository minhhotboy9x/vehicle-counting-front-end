import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './components/Navbar';
import AuthPage from './app/AuthPage';
import Homepage from './app/Homepage';
import Statistic from './app/Statistic';
import Footer from './components/Footer';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    'true'
  );

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setIsAuthenticated(storedAuth === 'true');
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated('true');
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', false);
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated &&
          <GoogleOAuthProvider clientId="745875377237-pqqjaukdkq4tjpta8rqobooi4fk8mfg8.apps.googleusercontent.com" 
          ><Navigation /></GoogleOAuthProvider>
        }

        <Switch>
          <Route exact path="/">
            {isAuthenticated ? <Redirect to="/homepage" /> : <AuthPage onLogin={handleLogin} />}
          </Route>

          <Route exact path="/homepage">
            {isAuthenticated ? <Homepage /> : <Redirect to="/" />}
          </Route>

          <Route exact path="/statistic">
            {isAuthenticated ? <Statistic /> : <Redirect to="/" />}
          </Route>
        </Switch>

        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
