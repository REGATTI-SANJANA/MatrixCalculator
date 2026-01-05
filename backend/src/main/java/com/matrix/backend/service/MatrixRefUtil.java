package com.matrix.backend.service;

public class MatrixRefUtil {

    public static final double EPS = 1e-9;

    /**
     * Converts matrix to REF in-place.
     * @return number of row swaps
     */
    public static int toREF(double[] A, int m, int n) {

        int row = 0;
        int swaps = 0;

        for (int col = 0; col < n && row < m; col++) {

            int pivot = row;
            while (pivot < m && Math.abs(A[pivot * n + col]) < EPS)
                pivot++;

            if (pivot == m) continue;

            // Swap rows
            if (pivot != row) {
                for (int j = 0; j < n; j++) {
                    double tmp = A[row * n + j];
                    A[row * n + j] = A[pivot * n + j];
                    A[pivot * n + j] = tmp;
                }
                swaps++;
            }

            // Eliminate below
            for (int i = row + 1; i < m; i++) {
                double factor = A[i * n + col] / A[row * n + col];
                for (int j = col; j < n; j++) {
                    A[i * n + j] -= factor * A[row * n + j];
                }
            }

            row++;
        }

        return swaps;
    }
}
