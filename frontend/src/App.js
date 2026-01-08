import React, { useState } from "react";
import {
  submitMatrix,
  getTrace,
  getDeterminant,
  getTranspose,
  getRank,
  getInverse,
  getAdjoint,
  getSpaces,
  getRow,
  getColumn,
  getEigen,
  getSubMatrix,
  multiplyMatrices,
  getPartitionMatrix
} from "./api";

import MatrixInput from "./components/MatrixInput";
import MatrixDisplay from "./components/MatrixDisplay";
import ResultSection from "./components/ResultSection";
import SpacesDisplay from "./components/SpacesDisplay";

import "./App.css";

const App = () => {
  const [rows, setRows] = useState("");
  const [cols, setCols] = useState("");
  const [elements, setElements] = useState("");

  /* Second Matrix */
  const [rowsB, setRowsB] = useState("");
  const [colsB, setColsB] = useState("");
  const [elementsB, setElementsB] = useState("");

  const [matrix, setMatrix] = useState(null);
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(null);
  const [spaces, setSpaces] = useState(null);
  const [error, setError] = useState("");

  /* Index-based */
  const [index, setIndex] = useState("");


  const [pRow, setPRow] = useState("");
  const [pCol, setPCol] = useState("");


  const parseMatrix = (str) =>
    str.trim().split(/\s+/).map(Number);

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      const data = {
        rows: Number(rows),
        cols: Number(cols),
        matrix: parseMatrix(elements)
      };

      await submitMatrix(data);

      setMatrix(data.matrix);
      setOperation("");
      setResult(null);
      setSpaces(null);
      setError("");
      setIndex("");
    } catch (e) {
      setError(e.message);
    }
  };

  /* ================= OPERATION ================= */
  const handleOperation = async (op) => {
    setOperation(op);
    setResult(null);
    setSpaces(null);
    setError("");
    setIndex("");
    setPRow("");     
    setPCol("");

    if (["row", "column", "multiply","partition"].includes(op)) return;

    const data = { rows: Number(rows), cols: Number(cols), matrix };

    try {
      if (op === "trace") setResult((await getTrace(data)).trace);
      if (op === "determinant") setResult((await getDeterminant(data)).determinant);
      if (op === "transpose") setResult((await getTranspose(data)).transpose);
      if (op === "rank") setResult((await getRank(data)).rank);
      if (op === "adjoint") setResult((await getAdjoint(data)).adjoint);
      if (op === "spaces") setSpaces(await getSpaces(data));
      if (op === "eigen") setResult(await getEigen(data));

      if (op === "inverse") {
        const res = await getInverse(data);
        if (res.message) return setError(res.message);
        setResult(res.inverse);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  /* ================= ROW / COLUMN ================= */
  const handleIndexOperation = async () => {
    if (index === "") {
      setError("Enter index");
      return;
    }

    const data = {
      rows: Number(rows),
      cols: Number(cols),
      matrix,
      index: Number(index)
    };

    try {
      setError("");
      if (operation === "row") setResult((await getRow(data)).row);
      if (operation === "column") setResult((await getColumn(data)).column);
    } catch (e) {
      setError(e.message);
    }
  };

  /* ================= MULTIPLICATION ================= */
  const handleMultiply = async () => {
    if (!rowsB || !colsB || !elementsB) {
      setError("Please enter second matrix completely");
      setResult(null);
      return;
    }

    const data = {
      rowsA: Number(rows),
      colsA: Number(cols),
      matrixA: matrix,
      rowsB: Number(rowsB),
      colsB: Number(colsB),
      matrixB: parseMatrix(elementsB)
    };

    try {
      const res = await multiplyMatrices(data);

      if (res.message) {
        setError(res.message);
        setResult(null);
        return;
      }

      setResult(res);
      setError("");
    } catch {
      setError("Backend connection failed");
    }
  };
  


  const handlePartition = async () => { 
    if (pRow === "" || pCol === "") {
      setError("Enter partition row and column");
      return; 
    }
    if (Number(pRow) < 0 ||
      Number(pRow) >= rows ||
      Number(pCol) < 0 ||
      Number(pCol) >= cols) 
      {
        setError("Partition index out of bounds");
        return;
      }
    try { 
      setError("");
      setResult( await getPartitionMatrix({
         rows: Number(rows), 
         cols: Number(cols), 
         matrix, 
         index: Number(pRow), 
         startCol: Number(pCol) 
        }) 
      );
    } catch { 
      setError("Backend connection failed"); 
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

      <MatrixDisplay matrix={matrix} rows={rows} cols={cols} title="Matrix A" />

      {matrix && (
        <div className="card">
          <h2>Choose Operation</h2>

          <select value={operation} onChange={(e) => handleOperation(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="trace">Trace</option>
            <option value="determinant">Determinant</option>
            <option value="transpose">Transpose</option>
            <option value="rank">Rank</option>
            <option value="inverse">Inverse</option>
            <option value="adjoint">Adjoint</option>
            <option value="row">Individual Row</option>
            <option value="column">Individual Column</option>
            <option value="multiply">Matrix Multiplication</option>
            <option value="eigen">Eigen Values & Vectors</option>
            <option value="spaces">Matrix Spaces</option>
            <option value="partition">Partition Matrix</option>
          </select>

          {(operation === "row" || operation === "column") && (
            <>
              <input
                placeholder="Index (0-based)"
                value={index}
                onChange={(e) => setIndex(e.target.value)}
              />
              <button onClick={handleIndexOperation}>Get</button>
            </>
          )}

          {operation === "multiply" && (
            <>
              <h3>Matrix B</h3>
              <input placeholder="Rows" value={rowsB} onChange={e => setRowsB(e.target.value)} />
              <input placeholder="Cols" value={colsB} onChange={e => setColsB(e.target.value)} />
              <textarea
                placeholder="Enter elements row-wise"
                value={elementsB}
                onChange={e => setElementsB(e.target.value)}
              />
              <button onClick={handleMultiply}>Multiply</button>
            </>
          )}
          {operation === "partition" && (
             <>
              <input placeholder="Partition Row" value={pRow} onChange={e => setPRow(e.target.value)} /> 
              <input placeholder="Partition Column" value={pCol} onChange={e => setPCol(e.target.value)} /> 
              <button onClick={handlePartition}>Partition</button>
            </>
          )}
        </div>
      )}

      <ResultSection
        operation={operation}
        result={result}
        rows={rows}
        cols={cols}
        error={error}
      />

      {spaces && <SpacesDisplay spaces={spaces} />}
    </div>
  );
};

export default App;
