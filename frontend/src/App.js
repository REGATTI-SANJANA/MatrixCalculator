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

  useEffect(() => {
    setIndices("");
    setResult(null);
    setError("");
  }, [operation]);

  const handleSubmit = async () => {
    try {
      const data = { rows: Number(rows), cols: Number(cols), matrix: parseMatrix(elements) };
      await submitMatrix(data);
      setMatrix(data.matrix);
      setOperation(""); setResult(null); setSpaces(null); setError("");
    } catch (e) { setError(e.message); }
  };

  const handleOperation = async (op) => {
    setOperation(op);
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

      if (res && res.message) setError(res.message);
      else setResult(res);
    } catch (e) { setError(e.message); }
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
    <div className="app-container">
      <div className="background-blobs">
        <div className="blob"></div>
        <div className="blob"></div>
      </div>

      <header className="glass-header">
        <h1>Matrix<span>Core</span></h1>
        <p>Advanced Linear Algebra Suite</p>
      </header>

      <main className="content-grid">
        <section className="input-section glass-card">
          <h3><i className="fas fa-edit"></i> Configure Matrix A</h3>
          <MatrixInput 
            rows={rows} cols={cols} elements={elements} 
            setRows={setRows} setCols={setCols} setElements={setElements} 
            onSubmit={handleSubmit} 
          />
        </section>

        <section className="display-section glass-card">
          <MatrixDisplay matrix={matrix} rows={rows} cols={cols} title="Primary Matrix A" />
        </section>

        {matrix && (
          <section className="ops-section glass-card">
            <h3><i className="fas fa-cogs"></i> Operations</h3>
            <div className="select-wrapper">
              <select value={operation} onChange={(e) => handleOperation(e.target.value)}>
                <option value="">-- Select Computation --</option>
                <optgroup label="Properties">
                  <option value="trace">Trace</option>
                  <option value="determinant">Determinant</option>
                  <option value="rank">Rank</option>
                </optgroup>
                <optgroup label="Transformations">
                  <option value="inverse">Inverse</option>
                  <option value="transpose">Transpose</option>
                  <option value="adjoint">Adjoint</option>
                </optgroup>
                <optgroup label="Extraction">
                  <option value="row">Extract Rows</option>
                  <option value="column">Extract Columns</option>
                  <option value="submatrix">Sub-Matrix</option>
                </optgroup>
                <optgroup label="Advanced">
                  <option value="multiply">Multiplication</option>
                  <option value="partition">Multi-Partition</option>
                  <option value="eigen">Eigenvalues/Vectors</option>
                  <option value="spaces">Matrix Spaces</option>
                </optgroup>
              </select>
            </div>

            <div className="dynamic-inputs">
              {(operation === "row" || operation === "column") && (
                <div className="input-row anim-in">
                  <input placeholder="Indices (e.g. 0,2)" value={indices} onChange={e => setIndices(e.target.value)} />
                  <button className="btn-action" onClick={handleIndexOp}>Execute</button>
                </div>
              )}

              {operation === "submatrix" && (
                <div className="input-grid anim-in">
                  <input placeholder="Start Row" onChange={e => setSubRef({...subRef, sR: e.target.value})} />
                  <input placeholder="End Row" onChange={e => setSubRef({...subRef, eR: e.target.value})} />
                  <input placeholder="Start Col" onChange={e => setSubRef({...subRef, sC: e.target.value})} />
                  <input placeholder="End Col" onChange={e => setSubRef({...subRef, eC: e.target.value})} />
                  <button className="btn-action full-width" onClick={handleSubMatrix}>Extract Submatrix</button>
                </div>
              )}

              {operation === "multiply" && (
                <div className="input-stack anim-in">
                  <div className="dim-row">
                    <input placeholder="Rows B" value={rowsB} onChange={e => setRowsB(e.target.value)} />
                    <input placeholder="Cols B" value={colsB} onChange={e => setColsB(e.target.value)} />
                  </div>
                  <textarea placeholder="Elements B (space separated)" value={elementsB} onChange={e => setElementsB(e.target.value)} />
                  <button className="btn-action" onClick={handleMultiply}>Compute A × B</button>
                </div>
              )}

              {operation === "partition" && (
                <div className="input-row anim-in">
                  <input placeholder="Row Splits (e.g. 1)" value={rowSplits} onChange={e => setRowSplits(e.target.value)} />
                  <input placeholder="Col Splits (e.g. 1)" value={colSplits} onChange={e => setColSplits(e.target.value)} />
                  <button className="btn-action" onClick={handlePartition}>Split</button>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="result-section">
          <ResultSection operation={operation} result={result} rows={rows} cols={cols} error={error} indices={indices}/>
          {spaces && <SpacesDisplay spaces={spaces} />}
        </section>
      </main>
    </div>
  );
};
export default App;