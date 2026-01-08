
import React, { useState, useEffect } from "react";
import {
  submitMatrix, getTrace, getDeterminant, getTranspose, getRank,
  getInverse, getAdjoint, getSpaces, getRow, getColumn,
  getEigen, getSubMatrix, multiplyMatrices, getPartitionMatrix
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

  const [rowsB, setRowsB] = useState("");
  const [colsB, setColsB] = useState("");
  const [elementsB, setElementsB] = useState("");

  const [matrix, setMatrix] = useState(null);
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(null);
  const [spaces, setSpaces] = useState(null);
  const [error, setError] = useState("");

  const [indices, setIndices] = useState(""); 
  const [rowSplits, setRowSplits] = useState("");
  const [colSplits, setColSplits] = useState("");
  const [subRef, setSubRef] = useState({ sR: "", eR: "", sC: "", eC: "" });

  const parseMatrix = (str) => str.trim().split(/\s+/).map(Number);
  const parseList = (str) => str ? str.split(',').map(x => parseInt(x.trim())).filter(n => !isNaN(n)) : [];

  const handleSubmit = async () => {
    try {
      const data = { rows: Number(rows), cols: Number(cols), matrix: parseMatrix(elements) };
      await submitMatrix(data);
      setMatrix(data.matrix);
      setOperation(""); setResult(null); setSpaces(null); setError("");
    } catch (e) { setError(e.message); }
  };

  useEffect(() => {
    setIndices("");
    setResult(null);
    setError("");
  }, [operation]);

  const handleOperation = async (op) => {
    setOperation(op);
    // State reset is now handled by the useEffect above for consistency
    if (["row", "column", "multiply", "partition", "submatrix"].includes(op)) return;

    const data = { rows: Number(rows), cols: Number(cols), matrix };
    try {
      const res = await (async () => {
        switch(op) {
          case "trace": return await getTrace(data);
          case "determinant": return await getDeterminant(data);
          case "transpose": return await getTranspose(data);
          case "rank": return await getRank(data);
          case "adjoint": return await getAdjoint(data);
          case "inverse": return await getInverse(data);
          case "eigen": return await getEigen(data);
          case "spaces": 
            const sData = await getSpaces(data);
            setSpaces(sData);
            return null;
          default: return null;
        }
      })();

      if (res && res.message) {
        setError(res.message);
      } else {
        setResult(res);
      }
    } catch (e) { 
      setError(e.message); 
    }
  };

  const handleIndexOp = async () => {
    const list = parseList(indices);
    const data = { rows: Number(rows), cols: Number(cols), matrix, rowIndices: list, columnIndices: list };
    try {
      const res = operation === "row" ? await getRow(data) : await getColumn(data);
      setResult(res);
    } catch (e) { setError("Extraction failed"); }
  };

  const handleSubMatrix = async () => {
    try {
      const res = await getSubMatrix({
        rows: Number(rows), cols: Number(cols), matrix,
        startRow: Number(subRef.sR), endRow: Number(subRef.eR),
        startCol: Number(subRef.sC), endCol: Number(subRef.eC)
      });
      setResult(res);
    } catch (e) { setError("Submatrix failed"); }
  };

  const handleMultiply = async () => {
    try {
      const res = await multiplyMatrices({
        rowsA: Number(rows), colsA: Number(cols), matrixA: matrix,
        rowsB: Number(rowsB), colsB: Number(colsB), matrixB: parseMatrix(elementsB)
      });
      if (res.message) setError(res.message);
      else setResult(res);
    } catch (e) { setError("Multiplication failed"); }
  };

  const handlePartition = async () => {
    try {
      const res = await getPartitionMatrix({
        rows: Number(rows), cols: Number(cols), matrix,
        rowSplits: parseList(rowSplits), colSplits: parseList(colSplits)
      });
      setResult(res);
    } catch (e) { setError("Partition failed"); }
  };

  return (
    <div className="app">
      <h1>Matrix Calculator</h1>
      <MatrixInput rows={rows} cols={cols} elements={elements} setRows={setRows} setCols={setCols} setElements={setElements} onSubmit={handleSubmit} />
      <MatrixDisplay matrix={matrix} rows={rows} cols={cols} title="Matrix A" />

      {matrix && (
        <div className="card">
          <h2>Operation</h2>
          <select value={operation} onChange={(e) => handleOperation(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="trace">Trace</option>
            <option value="determinant">Determinant</option>
            <option value="inverse">Inverse</option>
            <option value="transpose">Transpose</option>
            <option value="rank">Rank</option>
            <option value="adjoint">Adjoint</option>
            <option value="row">Extract Rows</option>
            <option value="column">Extract Columns</option>
            <option value="submatrix">Sub-Matrix</option>
            <option value="multiply">Multiplication</option>
            <option value="partition">Multi-Partition</option>
            <option value="eigen">Eigenvalues/Vectors</option>
            <option value="spaces">Matrix Spaces</option>
          </select>

          {(operation === "row" || operation === "column") && (
            <div className="input-group">
              <input placeholder="Indices e.g. 0,2" value={indices} onChange={e => setIndices(e.target.value)} />
              <button onClick={handleIndexOp}>Extract</button>
            </div>
          )}

          {operation === "submatrix" && (
            <div className="input-group">
              <input placeholder="Start Row" onChange={e => setSubRef({...subRef, sR: e.target.value})} />
              <input placeholder="End Row" onChange={e => setSubRef({...subRef, eR: e.target.value})} />
              <input placeholder="Start Col" onChange={e => setSubRef({...subRef, sC: e.target.value})} />
              <input placeholder="End Col" onChange={e => setSubRef({...subRef, eC: e.target.value})} />
              <button onClick={handleSubMatrix}>Get Submatrix</button>
            </div>
          )}

          {operation === "multiply" && (
            <div className="input-group">
              <input placeholder="Rows B" value={rowsB} onChange={e => setRowsB(e.target.value)} />
              <input placeholder="Cols B" value={colsB} onChange={e => setColsB(e.target.value)} />
              <textarea placeholder="Elements B" value={elementsB} onChange={e => setElementsB(e.target.value)} />
              <button onClick={handleMultiply}>Multiply</button>
            </div>
          )}

          {operation === "partition" && (
            <div className="input-group">
              <input placeholder="Row Splits" value={rowSplits} onChange={e => setRowSplits(e.target.value)} />
              <input placeholder="Col Splits" value={colSplits} onChange={e => setColSplits(e.target.value)} />
              <button onClick={handlePartition}>Partition</button>
            </div>
          )}
        </div>
      )}
      <ResultSection operation={operation} result={result} rows={rows} cols={cols} error={error} indices={indices}/>
      {spaces && <SpacesDisplay spaces={spaces} />}
    </div>
  );
};
export default App;