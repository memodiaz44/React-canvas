import React, { useState, useRef } from 'react';

function Canvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [width, setWidth] = useState(400);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const canvas = canvasRef.current;
    const drawingData = canvas.toDataURL(); // Convert canvas to data URL

    fetch('/api/save-drawing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ drawingData }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

  };
  const handleIncreaseWidth = () => {
    setWidth((prevWidth) => prevWidth + 400);
  };

  return (
    <div>
      <h2>Canvas Component</h2>
      <div style={{ width: `${width}px`, overflow: 'auto' }}>
      <canvas
        ref={canvasRef}
        width={width}  //width={400}
        height={400}
        style={{ backgroundColor: 'lightgray', width: `${width}px`  }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
      </div>
      <button onClick={handleSubmit}>Save Drawing</button>
      <button onClick={handleIncreaseWidth}>increase </button>
      
    </div>
  );
}

export default Canvas;
