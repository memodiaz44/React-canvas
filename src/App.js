import React, { useRef } from 'react';
import './App.css';
import Canvas from './component/Canvas';
import CanvasProperties from './component/CreateCAnvas';

function App() {
  const canvasRef = useRef(null);
  return (
    <div className="App">
      <h1 className="h1">Draw in here</h1>
      <Canvas />
      <CanvasProperties canvasComponent={Canvas} />
    </div>
  );
}

export default App;
