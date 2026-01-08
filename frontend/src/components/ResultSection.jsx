


import React from "react";
import MatrixDisplay from "./MatrixDisplay";

const ResultSection = ({ operation, result, rows, cols, error, indices }) => {
  if (!operation) return null;

  // Transform "1,2" into an array [1, 2] to use for labels
  const indexLabels = indices 
    ? indices.split(',').map(x => x.trim()).filter(x => x !== "") 
    : [];

  return (
    <div className="card">
      <h2>Result</h2>
      
      {error && (
        <div className="error-box" style={{ color: "red", padding: "10px", border: "1px solid red", borderRadius: "4px", backgroundColor: "#ffeeee", marginBottom: "15px" }}>
          <strong>Error: </strong> {error}
        </div>
      )}

      {!error && result && (
        <div className="results-container">
          {/* SCALAR RESULTS */}
          {operation === "trace" && <p>Trace: <b>{result.trace}</b></p>}
          {operation === "determinant" && <p>Determinant: <b>{result.determinant}</b></p>}
          {operation === "rank" && <p>Rank: <b>{result.rank}</b></p>}

          {/* SINGLE MATRIX RESULTS */}
          {operation === "transpose" && <MatrixDisplay matrix={result.transpose} rows={cols} cols={rows} title="Transpose" />}
          {operation === "inverse" && result.inverse && <MatrixDisplay matrix={result.inverse} rows={rows} cols={cols} title="Inverse Matrix" />}
          {operation === "adjoint" && <MatrixDisplay matrix={result.adjoint} rows={rows} cols={cols} title="Adjoint" />}

          {/* MULTIPLE ROW EXTRACTION - FIX APPLIED HERE */}
          {operation === "row" && result.rowsList?.map((r, i) => (
            <MatrixDisplay 
              key={i} 
              matrix={r} 
              rows={1} 
              cols={cols} 
              title={`Extracted Row ${indexLabels[i] !== undefined ? indexLabels[i] : i}`} 
            />
          ))}

          {/* MULTIPLE COLUMN EXTRACTION - FIX APPLIED HERE */}
          {operation === "column" && result.columnsList?.map((c, i) => (
            <MatrixDisplay 
              key={i} 
              matrix={c} 
              rows={rows} 
              cols={1} 
              title={`Extracted Column ${indexLabels[i] !== undefined ? indexLabels[i] : i}`} 
            />
          ))}

          {/* SUBMATRIX */}
          {operation === "submatrix" && result.subMatrix && (
            <MatrixDisplay matrix={result.subMatrix} rows={result.subRows} cols={result.subCols} title="Submatrix" />
          )}

          {/* MULTIPLICATION */}
          {operation === "multiply" && result.product && (
            <MatrixDisplay matrix={result.product} rows={result.rows} cols={result.cols} title="Product (A × B)" />
          )}

          {/* PARTITIONING */}
          {operation === "partition" && result.blocks && (
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${result.blockCols}, 1fr)`, gap: "15px" }}>
              {result.blocks.map((b, i) => (
                <MatrixDisplay key={i} matrix={b.matrix} rows={b.rows} cols={b.cols} title={`Block ${i + 1}`} />
              ))}
            </div>
          )}

          {/* EIGEN */}
          {operation === "eigen" && (
            <>
              <h3>Eigenvalues</h3>
              <p>{result.eigenValues?.join(", ")}</p>
              <MatrixDisplay matrix={result.eigenVectors} rows={rows} cols={cols} title="Eigenvectors Matrix" />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultSection;