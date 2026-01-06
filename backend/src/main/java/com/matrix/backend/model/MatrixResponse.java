package com.matrix.backend.model;

public class MatrixResponse {

    // Original matrix (1D – row major)
    private double[] originalMatrix;

    // Matrix dimensions
    private int rows;
    private int cols;

    // Scalar results
    private Double trace;
    private Double determinant;
    private Integer rank;
    private String message;

    // Matrix results
    private double[] transpose;
    private double[] inverse;
    private double[] adjoint;

    // Row / Column
    private double[] row;
    private double[] column;

    // ===== SUB MATRIX =====
    private double[] subMatrix;
    private Integer subRows;
    private Integer subCols;

    // ===== Getters & Setters =====

    public double[] getOriginalMatrix() {
        return originalMatrix;
    }

    public void setOriginalMatrix(double[] originalMatrix) {
        this.originalMatrix = originalMatrix;
    }

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

    public Double getTrace() {
        return trace;
    }

    public void setTrace(Double trace) {
        this.trace = trace;
    }

    public Double getDeterminant() {
        return determinant;
    }

    public void setDeterminant(Double determinant) {
        this.determinant = determinant;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public double[] getTranspose() {
        return transpose;
    }

    public void setTranspose(double[] transpose) {
        this.transpose = transpose;
    }

    public double[] getInverse() {
        return inverse;
    }

    public void setInverse(double[] inverse) {
        this.inverse = inverse;
    }

    public double[] getAdjoint() {
        return adjoint;
    }

    public void setAdjoint(double[] adjoint) {
        this.adjoint = adjoint;
    }

    public double[] getRow() {
        return row;
    }

    public void setRow(double[] row) {
        this.row = row;
    }

    public double[] getColumn() {
        return column;
    }

    public void setColumn(double[] column) {
        this.column = column;
    }

    public double[] getSubMatrix() {
        return subMatrix;
    }

    public void setSubMatrix(double[] subMatrix) {
        this.subMatrix = subMatrix;
    }

    public Integer getSubRows() {
        return subRows;
    }

    public void setSubRows(Integer subRows) {
        this.subRows = subRows;
    }

    public Integer getSubCols() {
        return subCols;
    }

    public void setSubCols(Integer subCols) {
        this.subCols = subCols;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
