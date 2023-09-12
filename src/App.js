// App.jsx
/* eslint-disable */ 
import React, {  useContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory,  } from 'react-router-dom';
import Canvas from './component/Canvas';
import Signup from './component/Signup';
import Login from './component/Login';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Landing, Home, Dashboard } from "./routes/auth"
import { UserProvider, UserContext } from './habdler/userContext';
import Footer from './component/Footer.jsx'
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
  const { user ,setUser } = useContext(UserContext);
  const logout = () => setUser(null)

const login = () =>{ 
  let path = `/login`; 
  history.push(path);
}

  return ( 
    <div>

  {user ? ( 
    <button className='bg-slate-800 w-20' onClick={logout}>logout</button>

  ) : ( <button className='bg-slate-800 w-20' onClick={login}>login</button> )}
  </div> 
  )
}



function App() {



  return (
    <Router>
       <UserProvider>
       <Navigation/>
      <div className="App">
        {/* <h1 className="h1">Welcome artist</h1> */}
        <Switch>
          <Route path="/" component={Home}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path='/login' component={Login}/>
          <Route path='/canvas' component={Canvas}/>
          <Route path='/signup' component={Signup}/>
        </Switch>
        
      </div>
      </UserProvider>
      <Footer/>
    </Router>
  );
}

function Navigation(){
const [isopen, setIsOpen] = useState(false)

  return(
    <div className='w-full 		'>
    <nav className='bg-slate-600  	'>
     
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/canvas">Canvas</Link>
      </li>
      <Content/>

    </nav>
    </div>
  )
}

export default App;
