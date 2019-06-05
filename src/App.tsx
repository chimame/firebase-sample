import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Notification from './components/Notification'

const Top: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Link className="App-link" to="/notification">Notification Sample</Link>
      </header>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Top} />
        <Route path="/notification" exact component={Notification} />
      </Switch>
    </Router>
  )
}

export default App
