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

  return (
    <div>
      <h2>Canvas Component</h2>
      <div style={{ width: `400px`, overflow: 'auto' }}>
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
      </div>
      <button onClick={handleSubmit}>Save Drawing</button>
      <button onClick={handleIncreaseWidth}>Increase</button>
      <button onClick={jumpAcross}>Forward</button>
      <button onClick={jumpABack}>Backwards</button>
    </div>
  );
}

export default Canvas;
