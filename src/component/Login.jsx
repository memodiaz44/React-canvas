import React, { useCallback, useContext, useState } from 'react';
import '../styles/login.css';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../habdler/userContext';
/* eslint-disable */ 
function Login() {
  const history = useHistory();
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);


  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const jsonData = {
        email: email,
        password: password
      };

      fetch('http://3.19.219.106:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.error === 'User not found') {
            // Display user not found error message
            alert('User not found. Please check your email or sign up.');
          } else if (!data.hasAccount) {
             history.push('/signup');
          } else {
            setUser(data); // Update the user state
            console.log(data)

            history.push('/canvas');
     
          
            alert(`Hi ${data.name}, Welcome back!`);
          
          }
        })
        .catch((error) => {
            console.log("Error:", error);
        });

      setEmail('');
      setPassword('');
    },
    [email, password, history, setUser]
  );

  return (
    <div className="bg-slate-800 m-20 p-20 rounded-2xl border-slate-100		border-2">
      <form onSubmit={handleSubmit}>
        <div className="email">
          <h1>Welcome back!</h1>
          <label>Email</label>
          <input
            className='appearance-none bg-slate-100	 border-none w-full text-teal-900				 mr-3 py-1 px-2 leading-tight focus:outline-none'
            type="text"
            name="email"
            placeholder='email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className='appearance-none bg-slate-100	 border-none w-full text-teal-900		 mr-3 py-1 px-2 leading-tight focus:outline-none'
            placeholder='password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="submit">
          <input className='bg-slate-500	hover:bg-slate-600	w-20' type="submit" value="Submit" />
        </div><a href="/signup">Sign up</a>
        <span style={{
          paddingBottom: "20px"
        }}>Don't have an account yet? </span> 
      </form>
    </div>
  );
}

export default Login;
