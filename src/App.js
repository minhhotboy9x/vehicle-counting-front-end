import Homepage from './app/Homepage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <Homepage/>
      </div>
    </Router>
  );
}

export default App;
