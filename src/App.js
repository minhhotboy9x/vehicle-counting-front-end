import Homepage from './app/Homepage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navbar';
import { Overlay } from 'react-bootstrap';
import Statistic from './app/Statistic';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation/>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/statistic">
          <Statistic />
        </Route>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
