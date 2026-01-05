package com.matrix.backend.model;

public class MatrixRequest {

    private int rows;
    private int cols;
    private double[] matrix;   // linear indexed input matrix

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
}
