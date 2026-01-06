package com.matrix.backend.service;

import org.springframework.stereotype.Service;

@Service
public class MatrixMultiplicationService {

    public double[] multiply(
            int rowsA,
            int colsA,
            double[] A,
            int rowsB,
            int colsB,
            double[] B
    ) {

        if (colsA != rowsB) {
            throw new IllegalArgumentException(
                "Matrix multiplication not possible: columns of A must equal rows of B"
            );
        }

        double[] result = new double[rowsA * colsB];

        for (int i = 0; i < rowsA; i++) {
            for (int j = 0; j < colsB; j++) {
                double sum = 0;

                for (int k = 0; k < colsA; k++) {
                    sum += A[i * colsA + k] * B[k * colsB + j];
                }

                result[i * colsB + j] = sum;
            }
        }

        return result;
    }
}
