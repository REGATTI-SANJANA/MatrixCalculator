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
           {/* Partition Display */}  
      {!error && operation === "partition" && result && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <MatrixDisplay matrix={result.a11} rows={result.a11Rows} cols={result.a11Cols} title="A11" />
          <MatrixDisplay matrix={result.a12} rows={result.a12Rows} cols={result.a12Cols} title="A12" />
          <MatrixDisplay matrix={result.a21} rows={result.a21Rows} cols={result.a21Cols} title="A21" />
          <MatrixDisplay matrix={result.a22} rows={result.a22Rows} cols={result.a22Cols} title="A22" />
        </div>
      )}
    </div>
  );
};

export default ResultSection;
