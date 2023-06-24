import React, {useContext} from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from "../habdler/userContext"
import '../styles/headers.css'

const Landing = () => {
 

    return (
        <>
      <div className="headers">
       <h1>NOTE STUDIO</h1>
       <h2>create</h2>
       <h3>build</h3>
       <h3>imagine</h3>
       
      </div>
      <footer><h3>by your side </h3></footer>
      </>
    );
  };

const Home = () => {
    return (
        <h1>Como has estado </h1>
    )
    
    
 }

 const Dashboard = () => {
    const { user } = useContext(UserContext);

    return(
        <div className="view">
        {user ? (
          <>
            <h1>Hi {user.name}</h1>
            {user.images > 0 ? <h2>Access images</h2> : <h2>No images saved yet</h2>}
          </>
        ) : (
          <h1>
            <a href="/login">Need to log in first</a>
          </h1>
        )}
      </div>
    )

 }



export {
    Landing, 
    Dashboard, 
    Home 
}