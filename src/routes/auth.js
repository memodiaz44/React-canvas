import React, {useContext, useState} from "react";
/* eslint-disable */ 
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from "../habdler/userContext"
import '../styles/headers.css'
import Video from "../images/video.mp4"




const Home = () => {
    return (
        <>

<div className="video1" 
  style={{
    width: '360px',
    height: '400px',
    overflow: 'hidden',
    position: 'relative',
    margin: '0 auto'
  }}
>
  <video
    style={{
      width: '400px',
      height: '400px',
      position: 'absolute',
      left: '-20px',
      top: '0'
    }}
    src={Video}
    autoPlay
    loop  
    muted
  ></video>
</div>
      <div className="headers">
   
       <h1>NOTE STUDIO</h1>
       <h2 style={{color: "blue" }}>create</h2>
       <h3 style={{color: "green"}}>build</h3>
       <h4 style={{color: "pink",
       padding: '10px' 
      
      }} >imagine</h4>
      
       
      </div>
      <a className="anchor" style={{
        paddingBottom: '10px' 
      }} href="/canvas"> try now </a> 
      </>
    );
  };

 const Dashboard = () => {
    const { user } = useContext(UserContext);
    const [imageUrl, setImageUrl] = useState('');
    const [isRetrieveData, setIsRetrieveData] = useState(false);
    const [store, setStore] = useState([])



    const retrieveData = () => {
      let index = 0;
      if (store.length > 0) {
        setIsRetrieveData(false);
  
        const interval = setInterval(() => {
          setImageUrl(store[index]);
          index++;
          if (index === store.length) {
            clearInterval(interval);
            // Clear the interval when reaching the end of the array
          }
        }, 1000);
  
        return () => {
          clearInterval(interval);
        };
      } else if (store.length === 0) {
        alert('No content saved to animate');
      }
    };

    return (
      <div className="view m-20">
        {user ? (
          <>
            <h1>Hi {user.name}</h1>
            {user.image.length > 0 ? (
              <>
                <h2>Access images</h2>
                <div style={{ width: '100%', height: 0, paddingBottom: '56%', position: 'relative' }}>
                  <img
                    src={imageUrl}
                    alt="Saved Image"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      opacity: isRetrieveData ? 0.1 : 1,
                    }}
                  />
                </div>
                <button onClick={retrieveData}>Animate</button>
              </>
            ) : (
              <h2>No images saved yet</h2>
            )}
          </>
        ) : (
          <h1>
            <div style={{ width: '', height: 0, paddingBottom: '56%', position: 'relative' }}>
              <iframe
                src="https://giphy.com/embed/mvyvXwL26FfAtRCLPk"
                className='w-full h-200'
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <p>
              <a href="https://giphy.com/gifs/snl-saturday-night-live-season-47-mvyvXwL26FfAtRCLPk"></a>
            </p>
            <a className="mt-20" href="/login">Need to log in first</a>
          </h1>
        )}
      </div>
    );
  };


export {
    Dashboard, 
    Home 
}