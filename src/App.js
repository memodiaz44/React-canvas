// App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Canvas from './component/Canvas';
import Signup from './component/Signup';
import Login from './component/Login';

function setToken(usertoken) {
  sessionStorage.setItem('token', JSON.stringify(usertoken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

function App() {
  const token = getToken();

  return (
    <Router>
      <div className="App">
        <h1 className="h1">Welcome artist</h1>
        <Switch>
          <Route exact path="/" render={() => <Login setToken={setToken} />} />
          <Route path="/signup" component={Signup} />
          <Route path="/canvas" component={Canvas} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
