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
        <h1>yeah </h1>
    )

 }



export {
    Landing, 
    Dashboard, 
    Home 
}