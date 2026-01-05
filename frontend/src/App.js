import React, { useState } from "react";
import {
  submitMatrix,
  getTrace,
  getDeterminant,
  getTranspose,
  getRank,
  getInverse
} from "./api";

import MatrixInput from "./components/MatrixInput";
import MatrixDisplay from "./components/MatrixDisplay";
import ResultSection from "./components/ResultSection";
import "./App.css";

const App = () => {
  const [rows, setRows] = useState("");
const [cols, setCols] = useState("");

  const [elements, setElements] = useState("");
  const [matrix, setMatrix] = useState(null);

  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const parseMatrix = () =>
    elements.split(" ").map(Number);

  const handleSubmit = async () => {
    try {
      const data = {
        rows,
        cols,
        matrix: parseMatrix()
      };

      await submitMatrix(data);
      setMatrix(data.matrix);
      setOperation("");
      setResult(null);
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

const handleOperation = async (op) => {
  setOperation(op);
  setResult(null);
  setError("");

  const data = { rows, cols, matrix };

  try {
    if (op === "trace") {
      const res = await getTrace(data);
      setResult(res.trace);
    }

    if (op === "determinant") {
      const res = await getDeterminant(data);
      setResult(res.determinant);
    }

    if (op === "transpose") {
      const res = await getTranspose(data);
      setResult(res.transpose);
    }

    if (op === "rank") {
      const res = await getRank(data);
      setResult(res.rank);
    }

    if (op === "inverse") {
      const res = await getInverse(data);

      // ✅ KEY FIX
      if (res.message) {
        setError(res.message);   // show message
        setResult(null);         // NEVER send string to MatrixDisplay
        return;
      }

      setResult(res.inverse); // only array reaches MatrixDisplay
    }
  } catch (e) {
    setError(e.message);
    setResult(null);
  }
};


  return (
    <div className="app">
      <h1>Matrix Calculator</h1>

      <MatrixInput
        rows={rows}
        cols={cols}
        elements={elements}
        setRows={setRows}
        setCols={setCols}
        setElements={setElements}
        onSubmit={handleSubmit}
      />

      <MatrixDisplay
        matrix={matrix}
        rows={rows}
        cols={cols}
        title="Original Matrix"
      />


      {matrix && (
        <div className="card">
          <h2>Choose Operation</h2>
          <select onChange={(e) => handleOperation(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="trace">Trace</option>
            <option value="determinant">Determinant</option>
            <option value="transpose">Transpose</option>
            <option value="rank">Rank</option>
            <option value="inverse">Inverse</option>
          </select>
        </div>
      )}

      <ResultSection
        operation={operation}
        result={result}
        rows={rows}
        cols={cols}
        error={error}
      />
    </div>
  );
};

export default App;
