import React from 'react';


function CanvasProperties({ canvas }) {
  const handleProperties = () => {
    // Access the properties of the Canvas component
    console.log(canvas)
    // You can access and print other properties of the Canvas component as needed
  };

  return (
    <div>
      <h2>Canvas Properties Component</h2>
      <button onClick={handleProperties}>Get Properties</button>
    </div>
  );
}

export default CanvasProperties;
