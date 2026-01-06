package com.matrix.backend.model;

public class MatrixMultiplyResponse {

    private int rows;
    private int cols;
    private double[] product;
    private String message;

    public int getRows() { return rows; }
    public void setRows(int rows) { this.rows = rows; }

    public int getCols() { return cols; }
    public void setCols(int cols) { this.cols = cols; }

    public double[] getProduct() { return product; }
    public void setProduct(double[] product) { this.product = product; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
