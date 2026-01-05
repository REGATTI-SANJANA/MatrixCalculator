package com.matrix.backend.service;

import org.springframework.stereotype.Service;

@Service
public class InverseService {

    private static final double EPSILON = 1e-9;

    public double[] calculateInverse(int m, int n, double[] matrix) {

        if (m != n) {
            throw new IllegalArgumentException(
                    "Inverse is not possible for a rectangular matrix");
        }

        double[] lu = new double[n * n];
        System.arraycopy(matrix, 0, lu, 0, n * n);

        // 1. LU Decomposition (Doolittle – linear indexing)
        for (int j = 0; j < n; j++) {
            for (int i = 0; i < n; i++) {

                double sum = 0.0;
                int limit = Math.min(i, j);

                for (int k = 0; k < limit; k++) {
                    sum += lu[i * n + k] * lu[k * n + j];
                }

                if (i <= j) {
                    lu[i * n + j] -= sum;
                } else {
                    if (Math.abs(lu[j * n + j]) < EPSILON) {
                        throw new ArithmeticException(
                                "Inverse is not possible since determinant = 0");
                    }
                    lu[i * n + j] =
                            (lu[i * n + j] - sum) / lu[j * n + j];
                }
            }
        }

        // 2. Determinant check
        double det = 1.0;
        for (int i = 0; i < n; i++) {
            det *= lu[i * n + i];
        }

        if (Math.abs(det) < EPSILON) {
            throw new ArithmeticException(
                    "Inverse is not possible since determinant = 0");
        }

        // 3. Forward & Backward substitution
        double[] inverse = new double[n * n];

        for (int col = 0; col < n; col++) {

            double[] b = new double[n];
            b[col] = 1.0; // Identity column

            // Forward substitution (Ly = b)
            double[] y = new double[n];
            for (int i = 0; i < n; i++) {
                double sum = 0.0;
                for (int k = 0; k < i; k++) {
                    sum += lu[i * n + k] * y[k];
                }
                y[i] = b[i] - sum;
            }

            // Backward substitution (Ux = y)
            for (int i = n - 1; i >= 0; i--) {
                double sum = 0.0;
                for (int k = i + 1; k < n; k++) {
                    sum += lu[i * n + k] * inverse[k * n + col];
                }
                inverse[i * n + col] =
                        (y[i] - sum) / lu[i * n + i];
            }
        }

        return inverse;
    }
}
