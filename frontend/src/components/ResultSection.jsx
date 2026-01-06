// import React from "react";
// import MatrixDisplay from "./MatrixDisplay";

// const ResultSection = ({ operation, result, rows, cols, error }) => {
//   if (!operation) return null;

//   return (
//     <div className="card">
//       <h2>Result</h2>

//       {error && <div className="error-box">{error}</div>}

//       {!error && operation === "trace" && <p>Trace = <b>{result}</b></p>}
//       {!error && operation === "determinant" && <p>Determinant = <b>{result}</b></p>}
//       {!error && operation === "rank" && <p>Rank = <b>{result}</b></p>}

//       {!error &&
//         ["transpose", "inverse", "adjoint"].includes(operation) && (
//           <MatrixDisplay matrix={result} rows={rows} cols={cols} title={operation} />
//         )}

//       {!error && operation === "row" && (
//         <MatrixDisplay matrix={result} rows={1} cols={cols} title="Selected Row" />
//       )}

//       {!error && operation === "column" && (
//         <MatrixDisplay matrix={result} rows={rows} cols={1} title="Selected Column" />
//       )}

//       {!error && operation === "submatrix" && result && (
//         <MatrixDisplay
//           matrix={result.subMatrix}
//           rows={result.subRows}
//           cols={result.subCols}
//           title="Sub Matrix"
//         />
//       )}

//       {!error && operation === "eigen" && result && (
//         <>
//           <h3>Eigen Values</h3>
//           <ul>
//             {result.eigenValues.map((v, i) => (
//               <li key={i}>{v}</li>
//             ))}
//           </ul>

//           <h3>Eigen Vectors</h3>
//           <MatrixDisplay
//             matrix={result.eigenVectors}
//             rows={rows}
//             cols={cols}
//             title="Eigen Vectors (Columns)"
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default ResultSection;




import React from "react";
import MatrixDisplay from "./MatrixDisplay";

const ResultSection = ({ operation, result, rows, cols, error }) => {
  if (!operation) return null;

  return (
    <div className="card">
      <h2>Result</h2>

      {error && <div className="error-box">{error}</div>}

      {!error && operation === "trace" && <p>Trace = <b>{result}</b></p>}
      {!error && operation === "determinant" && <p>Determinant = <b>{result}</b></p>}
      {!error && operation === "rank" && <p>Rank = <b>{result}</b></p>}

      {!error &&
        ["transpose", "inverse", "adjoint"].includes(operation) && (
          <MatrixDisplay matrix={result} rows={rows} cols={cols} title={operation} />
        )}

      {!error && operation === "row" && (
        <MatrixDisplay matrix={result} rows={1} cols={cols} title="Selected Row" />
      )}

      {!error && operation === "column" && (
        <MatrixDisplay matrix={result} rows={rows} cols={1} title="Selected Column" />
      )}

      {!error && operation === "submatrix" && result && (
        <MatrixDisplay
          matrix={result.subMatrix}
          rows={result.subRows}
          cols={result.subCols}
          title="Sub Matrix"
        />
      )}

      {!error && operation === "multiply" && result && (
        <MatrixDisplay
          matrix={result.product}
          rows={result.rows}
          cols={result.cols}
          title="Matrix Product"
        />
      )}

      {!error && operation === "eigen" && result && (
        <>
          <h3>Eigen Values</h3>
          <ul>
            {result.eigenValues.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>

          <h3>Eigen Vectors</h3>
          <MatrixDisplay
            matrix={result.eigenVectors}
            rows={rows}
            cols={cols}
            title="Eigen Vectors (Columns)"
          />
        </>
      )}
    </div>
  );
};

export default ResultSection;
