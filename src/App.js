import Homepage from './app/Homepage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation/>
        <Homepage/>
      </div>
    </Router>
  );
}

export default App;
