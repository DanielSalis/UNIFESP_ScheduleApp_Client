import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import { UserStorage } from './UserContext'
import Login from './Pages/Login'
import './Layout/global.scss'
import Scheduler from './Pages/Scheduler'
import Dashboard from './Pages/Dashboard'
import Workers from './Pages/Workers'

function App() {
  return (
    <div className="App">
      <Router>
        {/* <UserStorage> */}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/scheduler" component={Scheduler} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/workers" component={Workers} />
        </Switch>
        {/* </UserStorage> */}
      </Router>
    </div>
  )
}

export default App
