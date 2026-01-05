package com.matrix.backend.service;

import org.springframework.stereotype.Service;

@Service
public class DeterminantService {

    private static final double EPSILON = 1e-10;

    public double calculateDeterminant(int m, int n, double[] matrix) {

        if (m != n) {
            throw new IllegalArgumentException(
                    "Determinant of a rectangular matrix cannot be found");
        }

        // Copy matrix so original does not change
        double[] A = new double[m * n];
        System.arraycopy(matrix, 0, A, 0, m * n);

        double det = 1.0;
        int sign = 1;

        for (int i = 0; i < n; i++) {

            int pivotIndex = i * n + i;

            // Handle zero pivot by row swapping
            if (Math.abs(A[pivotIndex]) < EPSILON) {

                int swapRow = i + 1;
                while (swapRow < n &&
                        Math.abs(A[swapRow * n + i]) < EPSILON) {
                    swapRow++;
                }

                if (swapRow == n) {
                    return 0.0; // determinant is zero
                }

                // Swap rows
                for (int col = 0; col < n; col++) {
                    int idx1 = i * n + col;
                    int idx2 = swapRow * n + col;

                    double temp = A[idx1];
                    A[idx1] = A[idx2];
                    A[idx2] = temp;
                }

                sign *= -1;
            }

            // Eliminate below pivot
            for (int row = i + 1; row < n; row++) {
                double factor = A[row * n + i] / A[i * n + i];

                for (int col = i; col < n; col++) {
                    A[row * n + col] -= factor * A[i * n + col];
                }
            }
        }

        // Product of diagonal elements
        for (int i = 0; i < n; i++) {
            det *= A[i * n + i];
        }

        return det * sign;
    }
}
