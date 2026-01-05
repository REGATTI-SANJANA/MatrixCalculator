import React from "react";
import MatrixDisplay from "./MatrixDisplay";

const SpacesDisplay = ({ spaces }) => {
  return (
    <div className="card">
      <h2>Matrix Spaces</h2>

      <MatrixDisplay
        matrix={spaces.rowSpace.flat()}
        rows={spaces.rowSpace.length}
        cols={spaces.rowSpace[0]?.length || 0}
        title="Row Space"
      />

      <MatrixDisplay
        matrix={spaces.columnSpace.flat()}
        rows={spaces.columnSpace.length}
        cols={spaces.columnSpace[0]?.length || 0}
        title="Column Space"
      />

      <MatrixDisplay
        matrix={spaces.nullSpace.flat()}
        rows={spaces.nullSpace.length}
        cols={spaces.nullSpace[0]?.length || 0}
        title="Null Space"
      />
    </div>
  );
};

export default SpacesDisplay;
