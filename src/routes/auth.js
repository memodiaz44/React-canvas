import React, {useContext} from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from "../habdler/userContext"
import '../styles/headers.css'


const Home = () => {

    return (
        <>
      <div className="headers">
       <h1>NOTE STUDIO</h1>
       <h2>create</h2>
       <h3>build</h3>
       <h3>imagine</h3>
      
       
      </div>
      <a href="/canvas"> try now </a> 
      <footer><h3>Fullstack web application that allows you to create animatins  </h3></footer>
      </>
    );
  };

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

<div style={{ width: '100%', height: 0, paddingBottom: '56%', position: 'relative' }}>
  <iframe src="https://giphy.com/embed/mvyvXwL26FfAtRCLPk" width="100%" height="100%" style={{ position: 'absolute' }} frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
</div>
<p><a href="https://giphy.com/gifs/snl-saturday-night-live-season-47-mvyvXwL26FfAtRCLPk"></a></p>
            <a href="/login">Need to log in first</a>
          </h1>
        )}
      </div>
    )

 }



export {
    Dashboard, 
    Home 
}