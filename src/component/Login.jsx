import React, { useCallback, useState } from 'react';
import '../styles/login.css';
import { useHistory } from 'react-router-dom';

function Login({ setToken }) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const jsonData = {
        email: email,
        password: password
      };

      fetch('http://localhost:5000/api/login', {
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
            setToken(data.token);
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
    [email, password, history, setToken]
  );

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="email">
          <label>Email</label>
          <input
            type="text"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="submit">
          <input type="submit" value="Submit" />
        </div>
        <span>Don't have an account yet? <a href="/signup">Sign up</a></span>
      </form>
    </div>
  );
}

export default Login;
