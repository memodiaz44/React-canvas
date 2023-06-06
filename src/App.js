import Canvas from "./component/Canvas"
import './App.css';


function App() {



  const drawingData = localStorage.getItem('canvasSaveData');
  return (
    <div className="App">
      <h1 className="h1">Draw in here</h1>
      <Canvas drawingData={drawingData}/>
    </div>
  );
}

export default App;
