import React, { useState } from "react";
import '../styles/signup.css'
import { useHistory } from 'react-router-dom';

/* eslint-disable */ 
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

        fetch("http://3.19.219.106:5001/api/register", {
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
      <div className="bg-slate-800 m-20 p-20 rounded-2xl border-slate-100		border-2">
      <form onSubmit={handleSubmit}>
        <h1>Sign up!</h1>
        <div className='form-field'>
          <label>Username</label>
          <input 
          type='text'
          className='appearance-none bg-slate-100	 border-none w-full text-teal-900	 mr-3 py-1 px-2 leading-tight focus:outline-none'
           name='username' 
           placeholder="username"
           required value={userName} 
           onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className='form-field'>
          <label>Email</label>
          <input 
          type='email' 
          className='appearance-none bg-slate-100	 border-none w-full text-teal-900	mr-3 py-1 px-2 leading-tight focus:outline-none'
          placeholder="email"
          name='email' 
          required value={email} 
          onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='form-field'>
          <label>Password</label>
          <input 
          type='password'
          className='appearance-none bg-slate-100	 border-none w-full text-teal-900	 mr-3 py-1 px-2 leading-tight focus:outline-none'
          placeholder="password"
          name='password' 
          required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='form-field'>
          <button  className='bg-slate-500	hover:bg-slate-600	w-20' type="submit" value="Submit" >Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default Signup