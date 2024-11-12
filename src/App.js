/* eslint-disable */

import "./App.css";
import { useState } from "react";


function App() {
  const [numRows, setNumRows] = useState(4);
  const [numCols, setNumCols] = useState(4);
  const [selectedSquares, setSelectedSquares] = useState(['0,0', '3,3'])

  const grid = [];
  const displayGrid = [];

  for (let r = 0; r < numRows; r++) {
    grid[r] = [];
    for (let c = 0; c < numCols; c++) {
      grid[r][c] = r+','+c;
      displayGrid.push(<div className={selectedSquares.includes(grid[r][c]) ? 'gridSquare selected' : 'gridSquare'} key={(r+' '+c)}>{grid[r][c]}</div>)
    }
    displayGrid.push(<br key={(r+' br')}></br>)
  }

  return (
    <div>
      <div className="inputArea">INPUT AREA</div>
      <div className="mainGrid">
        {displayGrid.map((item)=> item)}
      </div>
    </div>
  );
}

export default App;
