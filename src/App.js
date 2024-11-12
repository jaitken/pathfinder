/* eslint-disable */

import "./App.css";
import { useState } from "react";
import Input from "./components/Input";

function App() {
  const [numRows, setNumRows] = useState(4);
  const [numCols, setNumCols] = useState(4);
  const [selectedSquares, setSelectedSquares] = useState([]);

  const grid = [];
  const displayGrid = [];

  function handleSelect(row, col) {
    console.log(row + "," + col);
    const copyOfSelected = [...selectedSquares];
    if(copyOfSelected.includes(row+','+col)){
      let index = copyOfSelected.indexOf(row+','+col);
      copyOfSelected.splice(index, 1);
      setSelectedSquares([...copyOfSelected]);
    }
    else{
      setSelectedSquares((oldSelected)=>{
        return [...oldSelected, row+','+col]
      })
    }
  }

  function handleNumRowSelect(newRowCount){
    setNumRows(newRowCount)
  }

  function handleNumColSelect(newRowCount){
    setNumCols(newRowCount)
  }

  for (let r = 0; r < numRows; r++) {
    grid[r] = [];
    for (let c = 0; c < numCols; c++) {
      grid[r][c] = r + "," + c;
      displayGrid.push(
        <div
          className={
            selectedSquares.includes(grid[r][c])
              ? "gridSquare selected"
              : "gridSquare"
          }
          key={r + " " + c}
          onClick={() => handleSelect(r, c)}
        >
          {grid[r][c]}
        </div>
      );
    }
    displayGrid.push(<br key={r + " br"}></br>);
  }

  return (
    <div>
      <Input numRows={numRows} onRowChange={handleNumRowSelect} numCols={numCols} onColChange={handleNumColSelect} ></Input>
      <div className="mainGrid">{displayGrid.map((item) => item)}</div>
    </div>
  );
}

export default App;
