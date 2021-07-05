import './App.css'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './page/login'
import DashBorad from './page/dashBorad'
import UserManagement from './page/userManagement'
import TransactionLog from './page/transactionlog'

const Project = () => <h1>Project</h1>
const NotFoundPage = () => <h1>404</h1>

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashBoard" component={DashBorad} />
        <Route path="/userManagement" component={UserManagement} />
        <Route path="/transactionLog" component={TransactionLog} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}
