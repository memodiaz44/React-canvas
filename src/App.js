// App.jsx
import React, {  useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory,  } from 'react-router-dom';
import Canvas from './component/Canvas';
import Signup from './component/Signup';
import Login from './component/Login';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Landing, Home, Dashboard } from "./routes/auth"
import { UserProvider, UserContext } from './habdler/userContext';

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
    <button onClick={logout}>logout</button>

  ) : ( <button onClick={login}>login</button> )}
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
          <Route path="/landing" component={Landing} />
          <Route path="/home" component={Home}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path='/login' component={Login}/>
          <Route path='/canvas' component={Canvas}/>
          <Route path='/signup' component={Signup}/>
        </Switch>
        
      </div>
      </UserProvider>
    </Router>
  );
}

function Navigation(){
  return(
    <div className='content'>
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
      <li>
        <Link to="/canvas">Canvas</Link>
      </li>
      <Content/>

    </nav>
    </div>
  )
}

export default App;
