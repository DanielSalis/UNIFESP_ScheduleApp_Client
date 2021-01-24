import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { UserStorage } from './UserContext'
import Login from './Pages/Login'
import Schedule from './Pages/Schedule'

function App() {
  return (
    <div className="App">
      <Router>
        <UserStorage>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/dashboard" component={Schedule} />
            <Route path="/workers" component={Schedule} />
          </Switch>
        </UserStorage>
      </Router>
    </div>
  )
}

export default App
