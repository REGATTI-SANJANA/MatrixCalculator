// import React, { useState } from "react";
// import {
//   submitMatrix,
//   getTrace,
//   getDeterminant,
//   getTranspose,
//   getRank,
//   getInverse,
//   getAdjoint,
//   getSpaces
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

//   const parseMatrix = () =>
//     elements.trim().split(/\s+/).map(Number);

//   const handleSubmit = async () => {
//     try {
//       const data = { rows, cols, matrix: parseMatrix() };

//       await submitMatrix(data);
//       setMatrix(data.matrix);
//       setOperation("");
//       setResult(null);
//       setSpaces(null);
//       setError("");
//     } catch (e) {
//       setError(e.message);
//     }
//   };

//   const handleOperation = async (op) => {
//     setOperation(op);
//     setResult(null);
//     setSpaces(null);
//     setError("");

//     const data = { rows, cols, matrix };

//     try {
//       if (op === "trace") {
//         setResult((await getTrace(data)).trace);
//       }

//       if (op === "determinant") {
//         setResult((await getDeterminant(data)).determinant);
//       }

//       if (op === "transpose") {
//         setResult((await getTranspose(data)).transpose);
//       }

//       if (op === "rank") {
//         setResult((await getRank(data)).rank);
//       }

//       if (op === "inverse") {
//         const res = await getInverse(data);
//         if (res.message) {
//           setError(res.message);
//           return;
//         }
//         setResult(res.inverse);
//       }

//       if (op === "adjoint") {
//         setResult((await getAdjoint(data)).adjoint);
//       }

//       if (op === "spaces") {
//         setSpaces(await getSpaces(data));
//       }
//     } catch (e) {
//       setError(e.message);
//     }
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

//       <MatrixDisplay
//         matrix={matrix}
//         rows={rows}
//         cols={cols}
//         title="Original Matrix"
//       />

//       {matrix && (
//         <div className="card">
//           <h2>Choose Operation</h2>
//           <select onChange={(e) => handleOperation(e.target.value)}>
//             <option value="">-- Select --</option>
//             <option value="trace">Trace</option>
//             <option value="determinant">Determinant</option>
//             <option value="transpose">Transpose</option>
//             <option value="rank">Rank</option>
//             <option value="inverse">Inverse</option>
//             <option value="adjoint">Adjoint</option>
//             <option value="spaces">Spaces</option>
//           </select>
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
  getColumn
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

  const [matrix, setMatrix] = useState(null);
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(null);
  const [spaces, setSpaces] = useState(null);
  const [error, setError] = useState("");

  // For row / column index
  const [index, setIndex] = useState("");

  const parseMatrix = () =>
    elements.trim().split(/\s+/).map(Number);

  const handleSubmit = async () => {
    try {
      const data = {
        rows: Number(rows),
        cols: Number(cols),
        matrix: parseMatrix()
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

  const handleOperation = async (op) => {
    setOperation(op);
    setResult(null);
    setSpaces(null);
    setError("");

    const data = {
      rows: Number(rows),
      cols: Number(cols),
      matrix
    };

    try {
      if (op === "trace") {
        setResult((await getTrace(data)).trace);
      }

      if (op === "determinant") {
        setResult((await getDeterminant(data)).determinant);
      }

      if (op === "transpose") {
        setResult((await getTranspose(data)).transpose);
      }

      if (op === "rank") {
        setResult((await getRank(data)).rank);
      }

      if (op === "inverse") {
        const res = await getInverse(data);
        if (res.message) {
          setError(res.message);
          return;
        }
        setResult(res.inverse);
      }

      if (op === "adjoint") {
        setResult((await getAdjoint(data)).adjoint);
      }

      if (op === "row") {
        const res = await getRow({ ...data, index: Number(index) });
        setResult(res.row);
      }

      if (op === "column") {
        const res = await getColumn({ ...data, index: Number(index) });
        setResult(res.column);
      }

      if (op === "spaces") {
        setSpaces(await getSpaces(data));
      }
    } catch (e) {
      setError(e.message);
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

          {(operation === "row" || operation === "column") && (
            <input
              type="number"
              className="index-input"
              placeholder="Enter index (0-based)"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
            />
          )}

          <select onChange={(e) => handleOperation(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="trace">Trace</option>
            <option value="determinant">Determinant</option>
            <option value="transpose">Transpose</option>
            <option value="rank">Rank</option>
            <option value="inverse">Inverse</option>
            <option value="adjoint">Adjoint</option>
            <option value="row">Individual Row</option>
            <option value="column">Individual Column</option>
            <option value="spaces">Matrix Spaces</option>
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

      {spaces && <SpacesDisplay spaces={spaces} />}
    </div>
  );
};

export default App;
