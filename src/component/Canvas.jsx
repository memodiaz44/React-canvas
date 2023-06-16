import React, { useState, useRef, useEffect } from 'react';
import '../styles/canvas.css';

function Canvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [width, setWidth] = useState(400);
  const [savedImageData, setSavedImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [store, setStore] = useState([])
  const [index,  setIndex] = useState(0)

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

  const saveD = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL(); // Save canvas as data URL
      setSavedImageData(dataURL);
      setStore(prevStore => [...prevStore, dataURL])

    }
  };

  const handleLoadData = () => {
    if (savedImageData) {
      setImageUrl(savedImageData);
      console.log(savedImageData)
      setIsDrawing(false); // Reset the drawing state
    }
  };

  const clearData = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const retrieveData = () => {
    let index = 0
    if(store.length > 0){
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


  
  return (
    <div>
      <h2>Canvas Component</h2>
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
        opacity: retrieveData ? 0.1 :  handleLoadData ? 0.5 : 1,
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
    </div>
  );
}

export default Canvas;
