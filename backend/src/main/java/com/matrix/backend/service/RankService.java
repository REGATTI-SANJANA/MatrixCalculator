package com.matrix.backend.service;


import org.springframework.stereotype.Service;

@Service
public class RankService {

    private static final double EPSILON = 1e-10;

    public int calculateRank(int m, int n, double[] A) {

        // Copy matrix to avoid modifying original
        double[] data = new double[m * n];
        System.arraycopy(A, 0, data, 0, m * n);

        int rank = 0;
        int currentRow = 0;

        for (int col = 0; col < n && currentRow < m; col++) {

            // Find pivot
            int pivot = currentRow;
            for (int i = currentRow + 1; i < m; i++) {
                if (Math.abs(data[i * n + col]) >
                    Math.abs(data[pivot * n + col])) {
                    pivot = i;
                }
            }

            // Check pivot value
            if (Math.abs(data[pivot * n + col]) < EPSILON) {
                continue;
            }

            // Swap rows
            if (pivot != currentRow) {
                for (int j = col; j < n; j++) {
                    double temp = data[currentRow * n + j];
                    data[currentRow * n + j] = data[pivot * n + j];
                    data[pivot * n + j] = temp;
                }
            }

            // Eliminate below pivot
            for (int i = currentRow + 1; i < m; i++) {
                double factor = data[i * n + col] / data[currentRow * n + col];
                for (int j = col; j < n; j++) {
                    data[i * n + j] -= factor * data[currentRow * n + j];
                }
            }

            currentRow++;
            rank++;
        }

        return rank;
    }
}
