import Homepage from './main/Homepage';
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
