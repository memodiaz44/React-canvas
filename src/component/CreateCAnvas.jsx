import React from 'react';

function CanvasProperties({ canvasComponent }) {
  const handleProperties = () => {
    if (canvasComponent) {
      // Access the properties of the Canvas component
      console.log(canvasComponent);
      // You can access and print other properties of the Canvas component as needed
    } else {
      console.log('Canvas component is not yet assigned.');
    }
  };

  return (
    <div>
      <h2>Canvas Properties Component</h2>
      <button onClick={handleProperties}>Get Properties</button>
    </div>
  );
}

export default CanvasProperties;
