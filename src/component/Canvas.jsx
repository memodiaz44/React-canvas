import React, { useState, useRef, useEffect } from 'react';
import '../styles/canvas.css';

function Canvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [width, setWidth] = useState(400);
  const [savedImageData, setSavedImageData] = useState(null);
  const [showSavedImage, setShowSavedImage] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

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
    }
  };

  const handleLoadData = () => {
    if (savedImageData) {
      setImageUrl(savedImageData);
      setIsDrawing(false); // Reset the drawing state
    }
  };

  const clearData = () => {
    localStorage.removeItem('canvasImageData');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const background = new Image();
  
    background.onload = () => {
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
    };
  
    background.src = "http://www.samskirrow.com/background.png";
  }, []);
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
      
      </div>
      <button onClick={saveD}>Save Drawing</button>
      <button onClick={clearData}>Clear</button>
      <button onClick={handleLoadData}>Show Saved Image</button>
    </div>
  );
}

export default Canvas;
