package com.matrix.backend.model;

public class MatrixMultiplyRequest {

    private int rowsA;
    private int colsA;
    private double[] matrixA;

    private int rowsB;
    private int colsB;
    private double[] matrixB;

    // Getters & Setters
    public int getRowsA() { return rowsA; }
    public void setRowsA(int rowsA) { this.rowsA = rowsA; }

    public int getColsA() { return colsA; }
    public void setColsA(int colsA) { this.colsA = colsA; }

    public double[] getMatrixA() { return matrixA; }
    public void setMatrixA(double[] matrixA) { this.matrixA = matrixA; }

    public int getRowsB() { return rowsB; }
    public void setRowsB(int rowsB) { this.rowsB = rowsB; }

    public int getColsB() { return colsB; }
    public void setColsB(int colsB) { this.colsB = colsB; }

    public double[] getMatrixB() { return matrixB; }
    public void setMatrixB(double[] matrixB) { this.matrixB = matrixB; }
}
