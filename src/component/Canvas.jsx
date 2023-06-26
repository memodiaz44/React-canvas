import React, { useState, useRef, useContext  } from 'react';
import '../styles/canvas.css';
import { UserContext } from '../habdler/userContext';

function Canvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [width, setWidth] = useState(400);
  const [savedImageData, setSavedImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [store, setStore] = useState([])
  const [index,  setIndex] = useState(0)
  const { user ,setUser } = useContext(UserContext);
  const [isRetrieveData, setIsRetrieveData] = useState(false);


  

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
  
      if (user) {
        const userId = user.userId;
  
        try {
          const response = await fetch(`http://localhost:5000/api/users/${userId}/images`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, imageURL: dataURL }),
          });
  
          const data = await response.json();
          console.log(data.message);
        } catch (error) {
          console.log('Error saving image:', error);
        }
      }
  
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

  const handleLoadData = () => {
    if (savedImageData) {
      setImageUrl(savedImageData);
      console.log(savedImageData)
      setIsRetrieveData(true);
      setIsDrawing(false); // Reset the drawing state
      console.log('data loaded ')
     
    }
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
    }
  }

  const multiFunc = async () => {
    await saveD(); // Wait for saveD to complete
    await clearData(); // Wait for clearData to complete
    await handleLoadData(); // Wait for handleLoadData to complete

  };
  
  






  
  return (
    <div>
      {user ?  <h2> Draw {user.name}</h2> : <h2> Draw bb</h2>}
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
    opacity: isRetrieveData ? 0.1 : 1,
  }}
  draggable="false" 
  onMouseDown={startDrawing}
  onMouseMove={draw}
  onMouseUp={stopDrawing}
  onMouseOut={stopDrawing}
/>

  )}
      
      </div>
      <button onClick={saveD}>Save Drawing</button>
      <button onClick={retrieveData}>Animate</button>
      <button onClick={clearData}>Clear</button>
      <button onClick={handleLoadData}>Show Saved Image</button>
      <button onClick={multiFunc}>next</button>
    </div>
  );
}

export default Canvas;
