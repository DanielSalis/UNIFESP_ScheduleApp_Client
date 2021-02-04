import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import { UserStorage } from './UserContext'
import Login from './Pages/Login'
import './Layout/global.scss'
import {PrivateRoute} from './Components/PrivateRoute'
import Scheduler from './Pages/Scheduler'
import Dashboard from './Pages/Dashboard'
import Workers from './Pages/Workers'
import AddWorkers from './Pages/AddWorkers'

function App() {
  return (
    <div className="App">
      <Router>
        {/* <UserStorage> */}
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/scheduler" component={Scheduler} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/addWorkers" component={AddWorkers} />
          <PrivateRoute path="/workers" component={Workers} />
        </Switch>
        {/* </UserStorage> */}
      </Router>
    </div>
  )
}

export default App
