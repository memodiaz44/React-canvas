import React, { Component } from 'react';
import CanvasDraw from 'react-canvas-draw';
import "../styles/canvas.css"

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      canvasKey: 0,
      canvasSaveData: null
    };
  }

  handleCreateNewCanvas = () => {
    const saveData = localStorage.getItem('canvasSaveData');
    if (saveData) {
      const parsedData = JSON.parse(saveData);
      const modifiedLines = parsedData.lines.map(line => {
        if (line.brushColor === "#444") {
          return { ...line, brushColor: "grey" };
        }
        return line;
      });
  
      const modifiedSaveData = JSON.stringify({ ...parsedData, lines: modifiedLines });
      console.log(modifiedSaveData);
      localStorage.setItem("canvasSaveData", modifiedSaveData);
      this.canvasRef.current.loadSaveData(modifiedSaveData, true);
    }
  };
  
  
  
  
  
  
  
  
  



  saveCanvas = () => {
    if (this.canvasRef.current) {
      const saveData = this.canvasRef.current.getSaveData();
  
      // Load the previous canvas data from localStorage
      const previousSaveData = localStorage.getItem('canvasSaveData');
  
      if (previousSaveData) {
        const parsedPreviousData = JSON.parse(previousSaveData);
  
        // Remove the modifications made by handleCreateNewCanvas
        parsedPreviousData.lines[0].brushColor = '#444';
  
        // Save the modified previous data to localStorage
        localStorage.setItem('canvasSaveData', JSON.stringify(parsedPreviousData));
      }
  
      // Save the new canvas data to localStorage
      localStorage.setItem('canvasSaveData', saveData);
      this.setState({ canvasSaveData: saveData });
    }
  };
  

  clearCanvas = () => {
    if (this.canvasRef.current) {
      this.canvasRef.current.clear();
      
    }
  };
  
  nextCAnvas = () => {
    const { brushColor } = this.canvasRef.current.props;

    if (brushColor === '#444') {
      this.canvasRef.current.update({ brushColor: '#ff0000' });
    } else {
      this.canvasRef.current.update({ brushColor: '#444' });
    } 
  };
  
  loadCanvas = () => {
    const saveData = localStorage.getItem('canvasSaveData');
    if (saveData) {
      this.setState({ canvasSaveData: saveData }); // Update the canvas data in state
      this.canvasRef.current.loadSaveData(saveData, true);
    }
  };

  
  



  exportCanvasDataURL = () => {
    if (this.canvasRef.current) {
      const dataURL = this.canvasRef.current.getDataURL('image/png', false, '#ffffff');
      console.log(dataURL);
    }
  };

  clearDrawing = () => {
    if (this.canvasRef.current) {
        localStorage.removeItem('canvasSaveData');
      this.canvasRef.current.clear();
      
    }
  };

  eraseAll = () => {
    if (this.canvasRef.current) {
      this.canvasRef.current.eraseAll();
    }
  };

  resetView = () => {
    if (this.canvasRef.current) {
      this.canvasRef.current.resetView();
    }
  };

  undoDrawing = () => {
    if (this.canvasRef.current) {
      this.canvasRef.current.undo();
    }
  };

  render() {
    const { canvasKey } = this.state;

    return (
      <div className='newone'>
        <h1>Canvas Component</h1>
        
        <button onClick={this.handleCreateNewCanvas}>Create New Canvas</button>
        <button onClick={this.clearCanvas}>Clear Canvas</button>
        <button onClick={this.nextCAnvas}>Change Red/Black</button>
        <button onClick={this.saveCanvas}>Save</button>
        <button onClick={this.loadCanvas}>Load</button>
        <button onClick={this.exportCanvasDataURL}>Export Data URL</button>
        <button onClick={this.clearDrawing}>Clear Drawing</button>
        <button onClick={this.eraseAll}>Erase All</button>
        <button onClick={this.resetView}>Reset View</button>
        <button onClick={this.undoDrawing}>Undo</button>
        <CanvasDraw ref={this.canvasRef} key={canvasKey} />
      </div>
    );
  }
}

export default Canvas;
