/* eslint-disable */

import "./App.css";
import { useState } from "react";
import Input from "./components/Input";

function App() {
  const [numRows, setNumRows] = useState(4);
  const [numCols, setNumCols] = useState(4);
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [editingWallSquares, setEditingWallSquares] = useState(false);
  const [startSquare, setStartSquare] = useState("0,0");
  const [editingStartSquare, setEditingStartSquare] = useState(false);
  const [endSquare, setEndSquare] = useState("3,3");
  const [editingEndSquare, setEditingEndSquare] = useState(false);

  const grid = [];
  const displayGrid = [];

  function handleSelect(row, col) {
    console.log(row + "," + col);

    if (editingWallSquares) {
      if (`${row},${col}` === startSquare || `${row},${col}` === endSquare) {
        return;
      }
      const copyOfSelected = [...selectedSquares];
      if (copyOfSelected.includes(`${row},${col}`)) {
        let index = copyOfSelected.indexOf(row + "," + col);
        copyOfSelected.splice(index, 1);
        setSelectedSquares([...copyOfSelected]);
      } else {
        setSelectedSquares((oldSelected) => {
          return [...oldSelected, row + "," + col];
        });
      }
    }
    if (editingStartSquare) {
      if(selectedSquares.includes(`${row},${col}`)){
        return;
      }
      setStartSquare(`${row},${col}`);
      setEditingStartSquare(false);
    }
    if (editingEndSquare) {
      if(selectedSquares.includes(`${row},${col}`)){
        return;
      }
      setEndSquare(`${row},${col}`);
      setEditingEndSquare(false);
    }
  }

  function handleNumRowSelect(newRowCount) {
    setNumRows(newRowCount);
  }

  function handleNumColSelect(newRowCount) {
    setNumCols(newRowCount);
  }

  function getGridClass(r, c) {
    if (selectedSquares.includes(grid[r][c])) {
      return "gridSquare selected";
    }
    if (`${r},${c}` === startSquare) {
      return "gridSquare start";
    }
    if (`${r},${c}` === endSquare) {
      return "gridSquare end";
    }
    return "gridSquare";
  }

  for (let r = 0; r < numRows; r++) {
    grid[r] = [];
    for (let c = 0; c < numCols; c++) {
      grid[r][c] = r + "," + c;
      displayGrid.push(
        <div
          className={getGridClass(r, c)}
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
      <Input
        numRows={numRows}
        onRowChange={handleNumRowSelect}
        numCols={numCols}
        onColChange={handleNumColSelect}
        editStart={editingStartSquare}
        setEditStart={setEditingStartSquare}
        editEnd={editingEndSquare}
        setEditEnd={setEditingEndSquare}
        editWalls={editingWallSquares}
        setEditWalls={setEditingWallSquares}
      ></Input>
      <div className="mainGrid">{displayGrid.map((item) => item)}</div>
    </div>
  );
}

export default App;
