package com.matrix.backend.service;

import org.springframework.stereotype.Service;

@Service
public class SubMatrixService {

    /**
     * Extracts a sub-matrix from a given matrix (row-major).
     *
     * @param rows     total rows of original matrix
     * @param cols     total columns of original matrix
     * @param matrix   1D row-major matrix
     * @param startRow starting row index (0-based)
     * @param endRow   ending row index (0-based, inclusive)
     * @param startCol starting column index (0-based)
     * @param endCol   ending column index (0-based, inclusive)
     * @return         sub-matrix in 1D row-major form
     */
    public double[] getSubMatrix(
            int rows,
            int cols,
            double[] matrix,
            int startRow,
            int endRow,
            int startCol,
            int endCol
    ) {

        /* ================= VALIDATIONS ================= */

        if (rows <= 0 || cols <= 0) {
            throw new IllegalArgumentException("Invalid matrix dimensions");
        }

        if (matrix.length != rows * cols) {
            throw new IllegalArgumentException("Matrix size mismatch");
        }

        if (startRow < 0 || endRow >= rows || startRow > endRow) {
            throw new IllegalArgumentException("Invalid row range");
        }

        if (startCol < 0 || endCol >= cols || startCol > endCol) {
            throw new IllegalArgumentException("Invalid column range");
        }

        /* ================= SUB MATRIX EXTRACTION ================= */

        int subRows = endRow - startRow + 1;
        int subCols = endCol - startCol + 1;

        double[] subMatrix = new double[subRows * subCols];

        int index = 0;

        for (int i = startRow; i <= endRow; i++) {
            for (int j = startCol; j <= endCol; j++) {
                subMatrix[index++] = matrix[i * cols + j];
            }
        }

        return subMatrix;
    }
}
