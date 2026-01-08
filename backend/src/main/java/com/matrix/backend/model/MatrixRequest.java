// package com.matrix.backend.model;

// public class MatrixRequest {

//     // Matrix dimensions
//     private int rows;
//     private int cols;

//     // Matrix data (1D row-major)
//     private double[] matrix;

//     // For row / column operations
//     private Integer index;

//     // For sub-matrix operation (NEW)
//     private Integer startRow;
//     private Integer endRow;
//     private Integer startCol;
//     private Integer endCol;

//     // ---------- Getters & Setters ----------

//     public int getRows() {
//         return rows;
//     }

//     public void setRows(int rows) {
//         this.rows = rows;
//     }

//     public int getCols() {
//         return cols;
//     }

//     public void setCols(int cols) {
//         this.cols = cols;
//     }

//     public double[] getMatrix() {
//         return matrix;
//     }

//     public void setMatrix(double[] matrix) {
//         this.matrix = matrix;
//     }

//     public Integer getIndex() {
//         return index;
//     }

//     public void setIndex(Integer index) {
//         this.index = index;
//     }

//     // ---------- Sub-matrix fields (NEW) ----------

//     public Integer getStartRow() {
//         return startRow;
//     }

//     public void setStartRow(Integer startRow) {
//         this.startRow = startRow;
//     }

//     public Integer getEndRow() {
//         return endRow;
//     }

//     public void setEndRow(Integer endRow) {
//         this.endRow = endRow;
//     }

//     public Integer getStartCol() {
//         return startCol;
//     }

//     public void setStartCol(Integer startCol) {
//         this.startCol = startCol;
//     }

//     public Integer getEndCol() {
//         return endCol;
//     }

//     public void setEndCol(Integer endCol) {
//         this.endCol = endCol;
//     }
// }


package com.matrix.backend.model;

import java.util.List;

public class MatrixRequest {

    /* ===== MATRIX DIMENSIONS ===== */
    private int rows;
    private int cols;

    /* ===== MATRIX DATA ===== */
    private double[] matrix;

    /* ===== MULTIPLE ROWS & COLUMNS ===== */
    private List<Integer> rowIndices;
    private List<Integer> columnIndices;

    /* ===== PARTITION (MULTIPLE SPLITS) ===== */
    private List<Integer> rowSplits;
    private List<Integer> colSplits;
    //======== For sub-matrix operation (NEW)=====//
    private Integer startRow;
    private Integer endRow;
    private Integer startCol;
    private Integer endCol;
    /* ===== GETTERS & SETTERS ===== */

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public int getCols() {
        return cols;
    }

    public void setCols(int cols) {
        this.cols = cols;
    }

    public double[] getMatrix() {
        return matrix;
    }

    public void setMatrix(double[] matrix) {
        this.matrix = matrix;
    }

    public List<Integer> getRowIndices() {
        return rowIndices;
    }

    public void setRowIndices(List<Integer> rowIndices) {
        this.rowIndices = rowIndices;
    }

    public List<Integer> getColumnIndices() {
        return columnIndices;
    }

    public void setColumnIndices(List<Integer> columnIndices) {
        this.columnIndices = columnIndices;
    }

    public List<Integer> getRowSplits() {
        return rowSplits;
    }

    public void setRowSplits(List<Integer> rowSplits) {
        this.rowSplits = rowSplits;
    }

    public List<Integer> getColSplits() {
        return colSplits;
    }

    public void setColSplits(List<Integer> colSplits) {
        this.colSplits = colSplits;
    }
    // ---------- Sub-matrix fields (NEW) ----------

    public Integer getStartRow() {
        return startRow;
    }

    public void setStartRow(Integer startRow) {
        this.startRow = startRow;
    }

    public Integer getEndRow() {
        return endRow;
    }

    public void setEndRow(Integer endRow) {
        this.endRow = endRow;
    }

    public Integer getStartCol() {
        return startCol;
    }

    public void setStartCol(Integer startCol) {
        this.startCol = startCol;
    }

    public Integer getEndCol() {
        return endCol;
    }

    public void setEndCol(Integer endCol) {
        this.endCol = endCol;
    }
}

