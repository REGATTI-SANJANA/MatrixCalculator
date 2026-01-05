import React from "react";
import MatrixDisplay from "./MatrixDisplay";

const ResultSection = ({ operation, result, rows, cols, error }) => {
  if (!operation) return null;

  return (
    <div className="card">
      <h2>Result</h2>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {!error && operation === "trace" && (
        <p className="result-text">Trace = <b>{result}</b></p>
      )}

      {!error && operation === "determinant" && (
        <p className="result-text">Determinant = <b>{result}</b></p>
      )}

      {!error && operation === "rank" && (
        <p className="result-text">Rank = <b>{result}</b></p>
      )}

      {!error && (operation === "transpose" || operation === "inverse") && (
        <MatrixDisplay
          matrix={result}
          rows={operation === "transpose" ? cols : rows}
          cols={operation === "transpose" ? rows : cols}
          title={operation === "transpose" ? "Transpose Matrix" : "Inverse Matrix"}
        />
      )}
    </div>
  );
};

export default ResultSection;
