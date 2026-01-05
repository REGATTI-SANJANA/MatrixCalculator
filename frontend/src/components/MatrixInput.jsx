import React from "react";

const MatrixInput = ({
  rows,
  cols,
  elements,
  setRows,
  setCols,
  setElements,
  onSubmit
}) => {
  return (
    <div className="card">
      <h2>Matrix Input</h2>

      <label>Rows</label>
      <input
        type="number"
        value={rows}
        onChange={(e) => setRows(+e.target.value)}
      />

      <label>Columns</label>
      <input
        type="number"
        value={cols}
        onChange={(e) => setCols(+e.target.value)}
      />

      <label>Matrix Elements (space separated)</label>
      <textarea
        rows="3"
        value={elements}
        onChange={(e) => setElements(e.target.value)}
      />

      <button onClick={onSubmit}>Submit Matrix</button>
    </div>
  );
};

export default MatrixInput;
