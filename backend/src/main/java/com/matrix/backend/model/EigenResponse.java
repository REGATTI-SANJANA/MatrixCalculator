package com.matrix.backend.model;

public class EigenResponse {

    private double[] eigenValues;     // size n
    private double[] eigenVectors;    // size n*n (column-wise)

    public double[] getEigenValues() {
        return eigenValues;
    }

    public void setEigenValues(double[] eigenValues) {
        this.eigenValues = eigenValues;
    }

    public double[] getEigenVectors() {
        return eigenVectors;
    }

    public void setEigenVectors(double[] eigenVectors) {
        this.eigenVectors = eigenVectors;
    }
}
