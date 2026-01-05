import React from "react";

const MatrixDisplay = ({ matrix, rows, cols, title }) => {
  if (!matrix || matrix.length === 0) return null;

  return (
    <div className="matrix-box">
      <h3>{title}</h3>
      <pre className="matrix-text">
        {[...Array(rows)].map((_, i) => {
          const row = matrix
            .slice(i * cols, i * cols + cols)
            .map(v => v.toFixed(2).padStart(6))
            .join(" ");
          return `[ ${row} ]\n`;
        })}
      </pre>
    </div>
  );
};

export default MatrixDisplay;
