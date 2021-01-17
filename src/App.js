import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";

import Login from './Pages/Login';
import Schedule from './Pages/Schedule';


function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/schedule" component={Schedule} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
