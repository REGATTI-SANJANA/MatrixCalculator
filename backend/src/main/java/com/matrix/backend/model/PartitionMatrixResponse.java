package com.matrix.backend.model;

public class PartitionMatrixResponse {

    private double[] A11;
    private double[] A12;
    private double[] A21;
    private double[] A22;

    private int a11Rows, a11Cols;
    private int a12Rows, a12Cols;
    private int a21Rows, a21Cols;
    private int a22Rows, a22Cols;

    // Getters & Setters

    public double[] getA11() { return A11; }
    public void setA11(double[] a11) { A11 = a11; }

    public double[] getA12() { return A12; }
    public void setA12(double[] a12) { A12 = a12; }

    public double[] getA21() { return A21; }
    public void setA21(double[] a21) { A21 = a21; }

    public double[] getA22() { return A22; }
    public void setA22(double[] a22) { A22 = a22; }

    public int getA11Rows() { return a11Rows; }
    public void setA11Rows(int a11Rows) { this.a11Rows = a11Rows; }

    public int getA11Cols() { return a11Cols; }
    public void setA11Cols(int a11Cols) { this.a11Cols = a11Cols; }

    public int getA12Rows() { return a12Rows; }
    public void setA12Rows(int a12Rows) { this.a12Rows = a12Rows; }

    public int getA12Cols() { return a12Cols; }
    public void setA12Cols(int a12Cols) { this.a12Cols = a12Cols; }

    public int getA21Rows() { return a21Rows; }
    public void setA21Rows(int a21Rows) { this.a21Rows = a21Rows; }

    public int getA21Cols() { return a21Cols; }
    public void setA21Cols(int a21Cols) { this.a21Cols = a21Cols; }

    public int getA22Rows() { return a22Rows; }
    public void setA22Rows(int a22Rows) { this.a22Rows = a22Rows; }

    public int getA22Cols() { return a22Cols; }
    public void setA22Cols(int a22Cols) { this.a22Cols = a22Cols; }
}
