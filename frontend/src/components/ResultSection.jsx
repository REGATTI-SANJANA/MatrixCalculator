import React from "react";
import MatrixDisplay from "./MatrixDisplay";

const ResultSection = ({ operation, result, rows, cols, error }) => {
  if (!operation) return null;

  return (
    <div className="card">
      <h2>Result</h2>

      {error && <div className="error-box">{error}</div>}

      {!error && operation === "trace" && (
        <p className="result-text">
          Trace = <b>{result}</b>
        </p>
      )}

      {!error && operation === "determinant" && (
        <p className="result-text">
          Determinant = <b>{result}</b>
        </p>
      )}

      {!error && operation === "rank" && (
        <p className="result-text">
          Rank = <b>{result}</b>
        </p>
      )}

      {!error &&
        (operation === "transpose" ||
          operation === "inverse" ||
          operation === "adjoint") && (
          <MatrixDisplay
            matrix={result}
            rows={rows}
            cols={cols}
            title={
              operation === "transpose"
                ? "Transpose Matrix"
                : operation === "inverse"
                ? "Inverse Matrix"
                : "Adjoint Matrix"
            }
          />
        )}
        {!error && operation === "row" && (
          <MatrixDisplay
            matrix={result}
            rows={1}
            cols={cols}
            title="Selected Row"
          />
        )}

        {!error && operation === "column" && (
          <MatrixDisplay
            matrix={result}
            rows={rows}
            cols={1}
            title="Selected Column"
          />
        )}
    </div>
  );
};

export default ResultSection;
