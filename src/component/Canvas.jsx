import React, { useState, useRef } from 'react';
import '../styles/canvas.css'


function Canvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [width, setWidth] = useState(400);
  const [savedImageData, setSavedImageData] = useState(null);
  const [showSavedImage, setShowSavedImage] = useState(false);
  const [savedData, setSavedData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');


  const imageRef = useRef(null);


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

  const saveD = (e) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL(); // Save canvas as data URL
      setSavedImageData(dataURL);
      console.log(setSavedImageData)
    }
  };


  const handleLoadData = () => {
    if (savedImageData) {
      console.log(savedImageData)
      setImageUrl(savedImageData);

    }
  };
  
  
 
  

  const handleIncreaseWidth = () => {
    const canvas = canvasRef.current;
    if(canvasRef.current){
      console.log(canvasRef.current.getContext)
    }
    const ctx = canvas.getContext('2d');
  
    // Get the current drawing content
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
    // Increase the canvas width
    const newWidth = width + 400;
    setWidth(newWidth);
  
    // Resize the canvas
    canvas.width = newWidth;
  
    // Redraw the content on the resized canvas
    ctx.putImageData(imageData, 0, 0);
  };
  

  const jumpAcross = () => {
    const canvasContainer = canvasRef.current.parentNode;
    if (canvasContainer) {
      canvasContainer.scrollLeft += 400;
    }
  };

  const jumpABack = () => {
    const canvasContainer = canvasRef.current.parentNode;
    if (canvasContainer) {
      canvasContainer.scrollLeft -= 400;
    }
  };
  const handleShowSavedImage = () => {
    setShowSavedImage(true);
  };

  const clearData = () => {
    localStorage.removeItem("canvasImageData")
  }

  return (
    <div>
      <h2>Canvas Component</h2>
      <div style={{ width: `400px`, overflow: 'auto' }}>

      {imageUrl ? 
      <img src={imageUrl} alt="Loaded Image" />
      :
        <canvas
          ref={canvasRef}
          width={width}
          height={400}
          style={{ backgroundColor: 'lightgray', width: `${width}px` }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        />
  }
      </div>
      <button onClick={saveD}>Save Drawing</button>
      <button onClick={clearData}>Clear</button>
      <button onClick={handleLoadData}>Show Saved Image</button>
    </div>
  );
}

export default Canvas;
