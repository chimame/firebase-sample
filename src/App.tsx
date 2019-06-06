import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Notification from './components/Notification'
import Sync from './components/Sync'

const Top: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Link className="App-link" to="/notification">Notification Sample</Link>
        <Link className="App-link" to="/sync">Sync Sample</Link>
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
        <Route path="/sync" exact component={Sync} />
      </Switch>
    </Router>
  )
}

export default App
