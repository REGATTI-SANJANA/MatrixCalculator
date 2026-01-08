package com.matrix.backend.model;

public class PartitionBlock {

    private int rows;
    private int cols;
    private double[] matrix;

    public PartitionBlock(int rows, int cols, double[] matrix) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = matrix;
    }

    public int getRows() {
        return rows;
    }

    public int getCols() {
        return cols;
    }

    public double[] getMatrix() {
        return matrix;
    }
}
