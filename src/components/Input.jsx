/* eslint-disable */
import { useState } from "react";

export default function Input({ numRows, onRowChange, numCols, onColChange }) {
  const [rowCount, setRowCount] = useState(numRows);
  const [colCount, setColCount] = useState(numCols);
  const [isEditingRows, setIsEditingRows] = useState(false);
  const [isEditingCols, setIsEditingCols] = useState(false);

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
        onRowChange(rowCount);
      }
    } else {
      setIsEditingCols((editing) => !editing);
      if (isEditingCols) {
        onColChange(colCount);
      }
    }
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
  return (
    <div className="mainInput">
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
  );
}
