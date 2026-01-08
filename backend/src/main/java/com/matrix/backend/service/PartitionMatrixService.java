package com.matrix.backend.service;

import com.matrix.backend.model.PartitionMatrixResponse;
import org.springframework.stereotype.Service;

@Service
public class PartitionMatrixService {

    public PartitionMatrixResponse partition(
            int rows, int cols, double[] matrix,
            int splitRow, int splitCol
    ) {

        PartitionMatrixResponse res = new PartitionMatrixResponse();

        // Clamp indices safely (NO ERRORS)
        splitRow = Math.max(0, Math.min(splitRow, rows));
        splitCol = Math.max(0, Math.min(splitCol, cols));

        int r1 = splitRow;
        int r2 = rows - splitRow;
        int c1 = splitCol;
        int c2 = cols - splitCol;

        double[] A11 = new double[r1 * c1];
        double[] A12 = new double[r1 * c2];
        double[] A21 = new double[r2 * c1];
        double[] A22 = new double[r2 * c2];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {

                double val = matrix[i * cols + j];

                if (i < r1 && j < c1) {
                    A11[i * c1 + j] = val;
                } else if (i < r1) {
                    A12[i * c2 + (j - c1)] = val;
                } else if (j < c1) {
                    A21[(i - r1) * c1 + j] = val;
                } else {
                    A22[(i - r1) * c2 + (j - c1)] = val;
                }
            }
        }

        res.setA11(A11);
        res.setA12(A12);
        res.setA21(A21);
        res.setA22(A22);

        res.setA11Rows(r1); res.setA11Cols(c1);
        res.setA12Rows(r1); res.setA12Cols(c2);
        res.setA21Rows(r2); res.setA21Cols(c1);
        res.setA22Rows(r2); res.setA22Cols(c2);

        return res;
    }
}
