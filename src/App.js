// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect } from 'react-router-dom';
import Canvas from './component/Canvas';
import Signup from './component/Signup';
import Login from './component/Login';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Landing, Home, Dashboard } from "./routes/auth"
import { UserProvider } from './habdler/userContext';

// function useToken() { 
// const getToken = () => {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }
// const [token, setToken] = useState(getToken())
// const saveToken = userToken => {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
//   setToken(userToken.token);
// }; 
// return {
//   setToken: saveToken,
//   token
// }
// }

function Content (){
  const history = useHistory()
  const [user, setUser] = useState(null)

  const logout = () => setUser(null)

const login = () =>{ 
  let path = `/login`; 
  history.push(path);
}

  return ( 
    <div>
<Navigation/>
  {user ? ( 
    <button onClick={logout}>logout</button>
  
  ) : ( <button onClick={login}>login</button> )}
  </div>
  )
}



function App() {



  return (
    <Router>
       <UserProvider>
      <div className="App">
        {/* <h1 className="h1">Welcome artist</h1> */}
        <Switch>
          <Route path="/landing" component={Landing} />
          <Route path="/home" component={Home}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path='/login' component={Login}/>
          <Route path='/canvas' component={Canvas}/>
        </Switch>
        <Content/>
      </div>
      </UserProvider>
    </Router>
  );
}

function Navigation(){
  return(
    <nav>
      <li>
        <Link to="/landing">Landing</Link>
      </li>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>


    </nav>
  )
}

export default App;
