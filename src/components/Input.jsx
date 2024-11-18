/* eslint-disable */
import { useState } from "react";

function isNumeric(num){
  return !isNaN(num)
};

export default function Input({
  numRows,
  onRowChange,
  numCols,
  onColChange,
  editStart,
  setEditStart,
  editEnd,
  setEditEnd,
  editWalls,
  setEditWalls,
  resetPath,
  findPath,
  resetWalls,
  setShowGrid,
  showGrid,
}) {
  const [rowCount, setRowCount] = useState(numRows);
  const [colCount, setColCount] = useState(numCols);
  const [isEditingRows, setIsEditingRows] = useState(false);
  const [isEditingCols, setIsEditingCols] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  function handleInputChange(inputType) {
    if (inputType === "rows") {
      setRowCount(event.target.value);
    } else {
      setColCount(event.target.value);
    }
  }

  function handleEditClick(inputType) {
    if (inputType === "rows") {
      setIsEditingRows((editing) => !editing);
      if (isEditingRows) {
        if(rowCount > 0 && isNumeric(rowCount)){
          onRowChange(rowCount);
        } else{
          setErrorMessage(true);
          return;
        }
      }
    } else {
      setIsEditingCols((editing) => !editing);
      if (isEditingCols) {
        if(colCount > 0 && isNumeric(colCount)){
          onColChange(colCount);
        } 
        else {
          setErrorMessage(true);
          return;
        }
      }
    }
    setErrorMessage(false);
  }

  let displayNumRows = (
    <input
      className="inputBox disabledInput"
      value={rowCount}
      disabled={true}
    ></input>
  );

  if (isEditingRows) {
    displayNumRows = (
      <input
        className="inputBox"
        value={rowCount}
        onChange={() => handleInputChange("rows")}
      ></input>
    );
  }

  let displayNumCols = (
    <input
      className="inputBox disabledInput"
      value={colCount}
      disabled={true}
    ></input>
  );

  if (isEditingCols) {
    displayNumCols = (
      <input
        className="inputBox"
        value={colCount}
        onChange={() => handleInputChange("cols")}
      ></input>
    );
  }

  let editStartSquareButton = (
    <button
      onClick={() => {
        setEditStart(true);
        setEditEnd(false);
        setEditWalls(false);
        resetPath([]);
      }}
      className="button-4 greenButton"
    >
      Select Start Square
    </button>
  );

  if (editStart) {
    editStartSquareButton = (
      <button
        onClick={() => setEditStart(false)}
        className="button-4 greenButton selectedButton"
      >
        Stop Selecting
      </button>
    );
  }

  let editEndSquareButton = (
    <button
      onClick={() => {
        setEditEnd(true);
        setEditStart(false);
        setEditWalls(false);
        resetPath([]);
      }}
      className="button-4 pinkButton"
    >
      Select End Square
    </button>
  );

  if (editEnd) {
    editEndSquareButton = (
      <button
        onClick={() => setEditEnd(false)}
        className="button-4 pinkButton selectedButton"
      >
        Stop Selecting
      </button>
    );
  }

  let editWallButton = (
    <button
      onClick={() => {
        setEditWalls(true);
        setEditStart(false);
        setEditEnd(false);
        resetPath([]);
      }}
      className="button-4 blueButton"
    >
      Select Walls
    </button>
  );

  if (editWalls) {
    editWallButton = (
      <button
        onClick={() => setEditWalls(false)}
        className="button-4 blueButton selectedButton"
      >
        Stop Selecting
      </button>
    );
  }

  let findPathButton = (
    <button
      onClick={() => {
        findPath();
        setEditEnd(false);
        setEditStart(false);
        setEditWalls(false);
      }}
      className="button-4"
    >
      Find Path
    </button>
  );

  let clearButton = (
    <button
      onClick={() => {
        resetPath([]);
        resetWalls([]);
        setEditWalls();
        setEditEnd(false);
        setEditStart(false);
      }}
      className="button-4"
    >
      Clear
    </button>
  );

  let showGridButton = (
    <button onClick={() => setShowGrid(true)} className="button-4">
      Show Grid Numbers
    </button>
  );

  if (showGrid) {
    showGridButton = (
      <button onClick={() => setShowGrid(false)} className="button-4">
        Hide Grid Numbers
      </button>
    );
  }

  return (
    <div className="mainInput">
      <h1>A * Path Finding</h1>
      <div className="innerInput">
        <div className="rowDiv">
          {displayNumRows}
          <button onClick={() => handleEditClick("rows")} className="button-4">
            {isEditingRows ? "Save" : "Edit Rows"}
          </button>
        </div>
        <div className="colDiv">
          {displayNumCols}
          <button onClick={() => handleEditClick("cols")} className="button-4">
            {isEditingCols ? "Save" : "Edit Cols"}
          </button>
        </div>
      </div>
      {errorMessage ? <h4> Enter a valid amount of rows and columns</h4> : ''}
      {editStartSquareButton}
      {editEndSquareButton}
      {editWallButton}
      <br />
      {findPathButton}
      {clearButton}
      {showGridButton}
    </div>
  );
}
