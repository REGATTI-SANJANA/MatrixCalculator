package com.matrix.backend.service;

import org.springframework.stereotype.Service;

@Service
public class AdjointService {

    private final DeterminantService determinantService;

    public AdjointService(DeterminantService determinantService) {
        this.determinantService = determinantService;
    }

    /* ================= ADJOINT ================= */
    public double[] calculateAdjoint(int n, double[] matrix) {

        if (n * n != matrix.length) {
            throw new IllegalArgumentException(
                    "Adjoint can only be computed for a square matrix");
        }

        // Special case: 1x1 matrix
        if (n == 1) {
            return new double[]{1};
        }

        double[] adjoint = new double[n * n];

        // Cofactor matrix + transpose
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {

                double[] minor = getMinor(matrix, n, i, j);

                double detMinor =
                        determinantService.calculateDeterminant(
                                n - 1, n - 1, minor);

                double sign = ((i + j) % 2 == 0) ? 1 : -1;

                // Transpose while assigning
                adjoint[j * n + i] = sign * detMinor;
            }
        }

        return adjoint;
    }

    /* ================= MINOR MATRIX ================= */
    private double[] getMinor(double[] A, int n, int row, int col) {

        double[] minor = new double[(n - 1) * (n - 1)];
        int idx = 0;

        for (int i = 0; i < n; i++) {
            if (i == row) continue;

            for (int j = 0; j < n; j++) {
                if (j == col) continue;

                minor[idx++] = A[i * n + j];
            }
        }
        return minor;
    }
}
