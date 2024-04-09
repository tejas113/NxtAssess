import './App.css'
import {Route, Switch} from 'react-router-dom'
import Login from './components/login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Assessment from './components/Assessment'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/assessment" component={Assessment} />
  </Switch>
)

export default App
