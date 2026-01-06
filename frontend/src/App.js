// import React, { useState } from "react";
// import {
//   submitMatrix,
//   getTrace,
//   getDeterminant,
//   getTranspose,
//   getRank,
//   getInverse,
//   getAdjoint,
//   getSpaces,
//   getRow,
//   getColumn,
//   getEigen,
//   getSubMatrix
// } from "./api";

// import MatrixInput from "./components/MatrixInput";
// import MatrixDisplay from "./components/MatrixDisplay";
// import ResultSection from "./components/ResultSection";
// import SpacesDisplay from "./components/SpacesDisplay";

// import "./App.css";

// const App = () => {
//   const [rows, setRows] = useState("");
//   const [cols, setCols] = useState("");
//   const [elements, setElements] = useState("");

//   const [matrix, setMatrix] = useState(null);
//   const [operation, setOperation] = useState("");
//   const [result, setResult] = useState(null);
//   const [spaces, setSpaces] = useState(null);
//   const [error, setError] = useState("");

//   /* ===== Row / Column ===== */
//   const [index, setIndex] = useState("");

//   /* ===== Sub Matrix ===== */
//   const [startRow, setStartRow] = useState("");
//   const [endRow, setEndRow] = useState("");
//   const [startCol, setStartCol] = useState("");
//   const [endCol, setEndCol] = useState("");

//   const parseMatrix = () =>
//     elements.trim().split(/\s+/).map(Number);

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async () => {
//     try {
//       const data = {
//         rows: Number(rows),
//         cols: Number(cols),
//         matrix: parseMatrix()
//       };

//       await submitMatrix(data);

//       setMatrix(data.matrix);
//       setOperation("");
//       setResult(null);
//       setSpaces(null);
//       setError("");

//       resetAllIndices();
//     } catch (e) {
//       setError(e.message);
//     }
//   };

//   /* ================= RESET HELPERS ================= */
//   const resetAllIndices = () => {
//     setIndex("");
//     setStartRow("");
//     setEndRow("");
//     setStartCol("");
//     setEndCol("");
//   };

//   /* ================= OPERATION ================= */
//   const handleOperation = async (op) => {
//     setOperation(op);
//     setResult(null);
//     setSpaces(null);
//     setError("");

//     resetAllIndices();

//     if (["row", "column", "submatrix"].includes(op)) return;

//     const data = { rows: Number(rows), cols: Number(cols), matrix };

//     try {
//       if (op === "trace") setResult((await getTrace(data)).trace);
//       if (op === "determinant") setResult((await getDeterminant(data)).determinant);
//       if (op === "transpose") setResult((await getTranspose(data)).transpose);
//       if (op === "rank") setResult((await getRank(data)).rank);

//       if (op === "inverse") {
//         const res = await getInverse(data);
//         if (res.message) return setError(res.message);
//         setResult(res.inverse);
//       }

//       if (op === "adjoint") setResult((await getAdjoint(data)).adjoint);
//       if (op === "spaces") setSpaces(await getSpaces(data));
//       if (op === "eigen") setResult(await getEigen(data));
//     } catch (e) {
//       setError(e.message);
//     }
//   };

//   /* ================= ROW / COLUMN ================= */
//   const handleIndexOperation = async () => {
//     if (index === "") {
//       setError("Please enter an index value");
//       setResult(null);
//       return;
//     }

//     const data = {
//       rows: Number(rows),
//       cols: Number(cols),
//       matrix,
//       index: parseInt(index)
//     };

//     try {
//       setError("");
//       if (operation === "row") setResult((await getRow(data)).row);
//       if (operation === "column") setResult((await getColumn(data)).column);
//     } catch (e) {
//       setError(e.message);
//     }
//   };

//   /* ================= SUB MATRIX ================= */
//   const handleSubMatrix = async () => {
//     if (
//       startRow === "" ||
//       endRow === "" ||
//       startCol === "" ||
//       endCol === ""
//     ) {
//       setError("Please fill all sub-matrix index fields");
//       setResult(null);
//       return;
//     }

//     const sr = parseInt(startRow);
//     const er = parseInt(endRow);
//     const sc = parseInt(startCol);
//     const ec = parseInt(endCol);

//     if (
//       sr < 0 || er >= rows ||
//       sc < 0 || ec >= cols ||
//       sr > er || sc > ec
//     ) {
//       setError("Invalid sub-matrix index range");
//       return;
//     }

//     const data = {
//       rows: Number(rows),
//       cols: Number(cols),
//       matrix,
//       startRow: sr,
//       endRow: er,
//       startCol: sc,
//       endCol: ec
//     };

//     try {
//       setError("");
//       setResult(await getSubMatrix(data));
//     } catch (e) {
//       setError(e.message);
//     }
//   };

//   /* ================= INPUT CHANGE HANDLER ================= */
//   const onIndexChange = (setter) => (e) => {
//     setter(e.target.value);
//     setResult(null);
//   };

//   return (
//     <div className="app">
//       <h1>Matrix Calculator</h1>

//       <MatrixInput
//         rows={rows}
//         cols={cols}
//         elements={elements}
//         setRows={setRows}
//         setCols={setCols}
//         setElements={setElements}
//         onSubmit={handleSubmit}
//       />

//       <MatrixDisplay matrix={matrix} rows={rows} cols={cols} title="Original Matrix" />

//       {matrix && (
//         <div className="card">
//           <h2>Choose Operation</h2>

//           <select value={operation} onChange={(e) => handleOperation(e.target.value)}>
//             <option value="">-- Select --</option>
//             <option value="trace">Trace</option>
//             <option value="determinant">Determinant</option>
//             <option value="transpose">Transpose</option>
//             <option value="rank">Rank</option>
//             <option value="inverse">Inverse</option>
//             <option value="adjoint">Adjoint</option>
//             <option value="eigen">Eigen Values & Vectors</option>
//             <option value="row">Individual Row</option>
//             <option value="column">Individual Column</option>
//             <option value="submatrix">Sub Matrix</option>
//             <option value="spaces">Matrix Spaces</option>
//           </select>

//           {(operation === "row" || operation === "column") && (
//             <>
//               <input
//                 type="number"
//                 placeholder="Index (0-based)"
//                 value={index}
//                 onChange={onIndexChange(setIndex)}
//               />
//               <button onClick={handleIndexOperation}>Get</button>
//             </>
//           )}

//           {operation === "submatrix" && (
//             <>
//               <input placeholder="Start Row" value={startRow} onChange={onIndexChange(setStartRow)} />
//               <input placeholder="End Row" value={endRow} onChange={onIndexChange(setEndRow)} />
//               <input placeholder="Start Col" value={startCol} onChange={onIndexChange(setStartCol)} />
//               <input placeholder="End Col" value={endCol} onChange={onIndexChange(setEndCol)} />
//               <button onClick={handleSubMatrix}>Get Sub Matrix</button>
//             </>
//           )}
//         </div>
//       )}

//       <ResultSection
//         operation={operation}
//         result={result}
//         rows={rows}
//         cols={cols}
//         error={error}
//       />

//       {spaces && <SpacesDisplay spaces={spaces} />}
//     </div>
//   );
// };

// export default App;


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
  multiplyMatrices
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

    if (["row", "column", "multiply"].includes(op)) return;

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
