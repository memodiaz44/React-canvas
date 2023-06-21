import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const Landing = () => {
return (
    <h1>Hi baby </h1>
)
}

const Home = () => {
    return (
        <h1>Como has estado </h1>
    )
    
    
 }

 const Dashboard = () => {
    return(
        <h1>yeah </h1>
    )

 }



export {
    Landing, 
    Dashboard, 
    Home 
}