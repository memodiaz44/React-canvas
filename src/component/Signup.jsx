import React, { useState } from "react";
import '../styles/signup.css'
import { useHistory } from 'react-router-dom';


const Signup = () => {
  const history = useHistory();

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const jsonData = {
            userName: userName,
            email: email,
            password: password
        }

        fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then((response) => response.json())
        .then((data) => {
          history.push('/login');
            console.log(data)
        })
        .catch((error) => {
            console.error(error)
        })

        setUserName('')
        setEmail('')
        setPassword('')
    }



    return(
        <div className='signup-container'>
      <form onSubmit={handleSubmit}>
        <h1>Sign up!</h1>
        <div className='form-field'>
          <label>Username</label>
          <input type='text' name='username' required value={userName} onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className='form-field'>
          <label>Email</label>
          <input type='email' name='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='form-field'>
          <label>Password</label>
          <input type='password' name='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='form-field'>
          <button type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default Signup