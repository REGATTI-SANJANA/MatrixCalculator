package com.matrix.backend.service;

import org.springframework.stereotype.Service;

@Service
public class DeterminantService {

    public double calculateDeterminant(int m, int n, double[] matrix) {

        if (m != n) {
            throw new IllegalArgumentException(
                    "Determinant of a rectangular matrix cannot be found");
        }

        double[] ref = matrix.clone();

        // ✅ MODIFIED: use common REF utility
        int swaps = MatrixRefUtil.toREF(ref, m, n);

        double det = (swaps % 2 == 0) ? 1.0 : -1.0;

        for (int i = 0; i < n; i++) {
            det *= ref[i * n + i];
        }

        return det;
    }
}
