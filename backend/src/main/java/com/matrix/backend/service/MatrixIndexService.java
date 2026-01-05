package com.matrix.backend.service;

import org.springframework.stereotype.Service;

@Service
public class MatrixIndexService {

    /* ================= PRINT SPECIFIC ROW ================= */
    public double[] getRow(int rows, int cols, double[] matrix, int rowIndex) {

        if (rowIndex < 0 || rowIndex >= rows) {
            throw new IllegalArgumentException("Invalid row index");
        }

        double[] row = new double[cols];
        for (int j = 0; j < cols; j++) {
            row[j] = matrix[rowIndex * cols + j];
        }

        return row;
    }

    /* ================= PRINT SPECIFIC COLUMN ================= */
    public double[] getColumn(int rows, int cols, double[] matrix, int colIndex) {

        if (colIndex < 0 || colIndex >= cols) {
            throw new IllegalArgumentException("Invalid column index");
        }

        double[] column = new double[rows];
        for (int i = 0; i < rows; i++) {
            column[i] = matrix[i * cols + colIndex];
        }

        return column;
    }
}
