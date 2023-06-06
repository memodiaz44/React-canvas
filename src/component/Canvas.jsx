import React, { Component } from 'react';
import CanvasDraw from 'react-canvas-draw';
import "../styles/canvas.css"

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      canvasKey: 0,
      canvasSaveData: null,
      canvasOpacity:  0.8

    };
  }

  handleCreateNewCanvas = () => {
    // Make the drawing content transparent
    const saveData = localStorage.getItem('canvasSaveData');
    if (saveData) {
      const parsedData = JSON.parse(saveData);
      let brushColor = parsedData.lines[0].brushColor;
      if (brushColor === "#444") {
        parsedData.lines[0].brushColor = "grey";
      }
      const modifiedSaveData = JSON.stringify(parsedData);
      console.log(modifiedSaveData)
      localStorage.setItem("canvasSaveData", modifiedSaveData);
  
      this.canvasRef.current.loadSaveData(modifiedSaveData, true);
    }
  };
  saveCanvas = () => {
    if (this.canvasRef.current) {
      const saveData = this.canvasRef.current.getSaveData();
      localStorage.setItem('canvasSaveData', saveData);
    }
  };
  
  clearCanvas = () => {
    if (this.canvasRef.current) {
      this.canvasRef.current.clear();
    }
  };

  nextCanvas = () => {
    const { brushColor } = this.canvasRef.current.props;

    if (brushColor === '#444') {
      this.canvasRef.current.update({ brushColor: '#ff0000' });
    } else {
      this.canvasRef.current.update({ brushColor: '#444' });
    }
  };

  loadCanvas = () => {
    const { drawingData } = this.props;

    if (drawingData) {
      this.canvasRef.current.loadSaveData(drawingData, true);
      this.setState({ canvasSaveData: null });
      localStorage.removeItem('canvasSaveData');
      this.nextCanvas(); // Call nextCanvas to update brush color
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