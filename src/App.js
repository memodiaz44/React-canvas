import React from 'react';
import './App.css';
import Canvas from './component/Canvas';
import CanvasProperties from './component/CreateCAnvas';

function App() {
  return (
    <div className="App">
      <h1 className="h1">Draw in here</h1>
      <Canvas /> 
      <CanvasProperties canvas={Canvas }/>
    </div>
  );
}

export default App;
