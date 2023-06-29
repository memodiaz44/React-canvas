import React, { useState, useEffect, useRef, useContext  } from 'react';
/* eslint-disable */ 
import '../styles/canvas.css';
import { UserContext } from '../habdler/userContext';

function Canvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [width, setWidth] = useState(400);
  const [savedImageData, setSavedImageData] = useState('');

  const [imageUrl, setImageUrl] = useState('');
  const [store, setStore] = useState([])
  const [index,  setIndex] = useState(0)
  const { user ,setUser } = useContext(UserContext);
  const [isRetrieveData, setIsRetrieveData] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [imageName, setImageName] = useState('');



  useEffect(() => {
    if (savedImageData) {
      handleLoadData();
    }
  }, [savedImageData]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = e.nativeEvent;

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = e.nativeEvent;

    if (isErasing) {
      ctx.strokeStyle = 'lightgray'; // Set erase color
      ctx.globalCompositeOperation = 'destination-out'; // Set erase mode
    } else {
      ctx.strokeStyle = 'black'; // Set draw color
      ctx.globalCompositeOperation = 'source-over'; // Set draw mode
    }

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const saveD = async () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL();

  
      setSavedImageData(dataURL);
      setStore(prevStore => [...prevStore, dataURL]);
      console.log(dataURL);
      console.log('data saved');
    }
  };
  

  const clearData = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log('data cleared ')
    return true 
  };



  const saveData = async () => {
    const userId = user.userID;
  
    if (savedImageData === null || imageName === '') {
      alert('No image saved');
      return;
    }
  
    if (!imageName) {
      alert('Please enter the name of the image');
      return;
    }
  
    const jsonData = {
      name: imageName,
      imageURL: savedImageData // Update to use 'imageURL' instead of 'imageURLs'
    };
  
    try {
      const response = await fetch(`http://3.19.219.106:5001/api/users/${userId}/images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        console.log(updatedUser); // Do something with the updated user object
      } else {
        throw new Error('Error adding image to user');
      }
    } catch (error) {
      console.error('Error adding image to user:', error);
    }
  };
  

  

  const handleLoadData = () => {
    if (savedImageData) {
      setImageUrl(savedImageData);
      console.log(savedImageData)
      setIsRetrieveData(true);
      setIsDrawing(false); // Reset the drawing state
      console.log('data loaded ')
     
    }
  };


  

  const erase = () => {
    setIsErasing(!isErasing); // Toggle the erasing mode
  };



  const retrieveData = () => {
    let index = 0
    if(store.length > 0){
      setIsRetrieveData(false);



      const interval = setInterval(() => { 
        console.log(imageUrl.opacity)
        setImageUrl(store[index])
        index++
        if (index === store.length) {
          clearInterval(interval);
          
          // Clear the interval when reaching the end of the array
        }
      }, 1000);

      return () => {
        clearInterval(interval)
      }
    } else if (store.length === 0){
      alert('no content saved to animate')
    }
  }

  const multiFunc = async () => {
    await saveD(); // Wait for saveD to complete
    await clearData(); // Wait for clearData to complete
    // handleLoadData will be triggered by the useEffect
  };
  
  return (
    <>
    {user ?  <h2> Draw {user.name}</h2> : <h2> Drawing TIme </h2>}
    <div className='container'>
   
      <div style={{ position: 'relative', width: '400px', height: '400px' }}>
        <canvas
          ref={canvasRef}
          width={width}
          height={400}
          style={{
           
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'lightgray',
            border: '2px solid ',
          }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          
        />
          {imageUrl && (
<img
  src={imageUrl}
  alt='baby'
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: isRetrieveData ? 0.2 : 1,
  }}
  draggable="false" 
  onMouseDown={startDrawing}
  onMouseMove={draw}
  onMouseUp={stopDrawing}
  onMouseOut={stopDrawing}
/>

  )}
      
      </div>
      <div className='buttons'>
        {user ? 
        <button onClick={() => {
        const imageName = prompt('Enter the name of the image');
         if (imageName) {
        setImageName(imageName);
         saveData(setImageName);
  }
}}>Save Drawing</button>
        :
      <button onClick={saveD}>Save Drawing</button>}
      <button onClick={erase}>
  {isErasing ? 'Draw' : 'Erase'}
</button>

      <button onClick={retrieveData}>Animate</button>
      <button onClick={clearData}>Clear</button>
      <button onClick={handleLoadData}>Show Saved Image</button>
      <button onClick={multiFunc}>next page</button>
      </div>
    </div>
    </>
  );
}

export default Canvas;
