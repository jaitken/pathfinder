/* eslint-disable */

import "./App.css";
import { useState } from "react";
import Input from "./components/Input";
import GridPoint from "./components/Gridpoint";
import heuristic from "./components/heuristic";

function App() {
  const [numRows, setNumRows] = useState(4);
  const [numCols, setNumCols] = useState(4);
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [editingWallSquares, setEditingWallSquares] = useState(false);
  const [startSquare, setStartSquare] = useState("0,0");
  const [editingStartSquare, setEditingStartSquare] = useState(false);
  const [endSquare, setEndSquare] = useState("3,3");
  const [editingEndSquare, setEditingEndSquare] = useState(false);

  const [finalPath, setFinalPath] = useState([]);

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
      if (selectedSquares.includes(`${row},${col}`)) {
        return;
      }
      setStartSquare(`${row},${col}`);
      setEditingStartSquare(false);
    }
    if (editingEndSquare) {
      if (selectedSquares.includes(`${row},${col}`)) {
        return;
      }
      setEndSquare(`${row},${col}`);
      setEditingEndSquare(false);
    }
  }

  function getGridClass(r, c) {
    if (selectedSquares.includes(`${r},${c}`)) {
      return "gridSquare selected";
    }
    if (`${r},${c}` === startSquare) {
      return "gridSquare start";
    }
    if (`${r},${c}` === endSquare) {
      return "gridSquare end";
    }
    if (finalPath.includes(`${r},${c}`)) {
      return "gridSquare path";
    }
    return "gridSquare";
  }

  for (let r = 0; r < numRows; r++) {
    grid[r] = [];
    for (let c = 0; c < numCols; c++) {
      grid[r][c] = new GridPoint(r, c, numRows, numCols, selectedSquares);
      displayGrid.push(
        <div
          className={getGridClass(r, c)}
          key={r + " " + c}
          onClick={() => handleSelect(r, c)}
        >
          {`${r},${c}`}
        </div>
      );
    }
    displayGrid.push(<br key={r + " br"}></br>);
  }

  //A * algorith setup
  ///////////////////////////////////////////////////////////
  /*
  let openSet = []; //array containing unevaluated grid points
  let closedSet = []; //array containing completely evaluated grid points

  let start; //starting grid point
  let end; // ending grid point (goal)
  let path = [];

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      grid[i][j].updateNeighbors(grid);
    }
  }

  start = grid[startSquare.charAt(0)][startSquare.charAt(2)];
  end = grid[endSquare.charAt(0)][endSquare.charAt(2)];

  openSet.push(start);

  ////////////////////////////////////////////////////
  // A * implementation 
  /////////////////////////////////////////////////////

  function search() {
    while (openSet.length > 0) {
      //assumption lowest index is the first one to begin with
      let lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }
      let current = openSet[lowestIndex];
  
      if (current === end) {
        let temp = current;
        path.push(temp);
        while (temp.parent) {
          path.push(temp.parent);
          temp = temp.parent;
        }
        console.log("DONE!");
        // return the traced path
        return path.reverse();
      }
  
      //remove current from openSet
      openSet.splice(lowestIndex, 1);
      //add current to closedSet
      closedSet.push(current);
  
      let neighbors = current.neighbors;
  
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
  
        if (!closedSet.includes(neighbor)) {
          let possibleG = current.g + 1;
  
          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          } else if (possibleG >= neighbor.g) {
            continue;
          }
  
          neighbor.g = possibleG;
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
    }
  
    //no solution by default
    return [];
  }
*/

  function runAStarSearch() {
    //A * algorith setup
    ///////////////////////////////////////////////////////////

    let openSet = []; //array containing unevaluated grid points
    let closedSet = []; //array containing completely evaluated grid points

    let start; //starting grid point
    let end; // ending grid point (goal)
    let path = [];

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        grid[i][j].updateNeighbors(grid);
      }
    }

    start = grid[startSquare.charAt(0)][startSquare.charAt(2)];
    end = grid[endSquare.charAt(0)][endSquare.charAt(2)];

    openSet.push(start);

    ////////////////////////////////////////////////////
    // A * implementation
    /////////////////////////////////////////////////////

    function search() {
      while (openSet.length > 0) {
        //assumption lowest index is the first one to begin with
        let lowestIndex = 0;
        for (let i = 0; i < openSet.length; i++) {
          if (openSet[i].f < openSet[lowestIndex].f) {
            lowestIndex = i;
          }
        }
        let current = openSet[lowestIndex];

        if (current === end) {
          let temp = current;
          path.push(temp);
          while (temp.parent) {
            path.push(temp.parent);
            temp = temp.parent;
          }
          // return the traced path
          return path.reverse();
        }

        //remove current from openSet
        openSet.splice(lowestIndex, 1);
        //add current to closedSet
        closedSet.push(current);

        let neighbors = current.neighbors;

        for (let i = 0; i < neighbors.length; i++) {
          let neighbor = neighbors[i];

          if (!closedSet.includes(neighbor)) {
            let possibleG = current.g + 1;

            if (!openSet.includes(neighbor)) {
              openSet.push(neighbor);
            } else if (possibleG >= neighbor.g) {
              continue;
            }

            neighbor.g = possibleG;
            neighbor.h = heuristic(neighbor, end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.parent = current;
          }
        }
      }

      //no solution by default
      return [];
    }

    let pathAsStringArray = search().map((item)=>{
      return String(item.x+','+item.y);
    })


    setFinalPath(pathAsStringArray)
  }

  console.log(finalPath);

  return (
    <div>
      <Input
        numRows={numRows}
        onRowChange={setNumRows}
        numCols={numCols}
        onColChange={setNumCols}
        editStart={editingStartSquare}
        setEditStart={setEditingStartSquare}
        editEnd={editingEndSquare}
        setEditEnd={setEditingEndSquare}
        editWalls={editingWallSquares}
        setEditWalls={setEditingWallSquares}
        resetPath={setFinalPath}
      ></Input>
      <button onClick={runAStarSearch}>Search</button>
      <div className="mainGrid">{displayGrid.map((item) => item)}</div>
    </div>
  );
}

export default App;
