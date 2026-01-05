package com.matrix.backend.service;

import org.springframework.stereotype.Service;

@Service
public class RankService {

    public int calculateRank(int m, int n, double[] matrix) {

        double[] ref = matrix.clone();

        // ✅ MODIFIED: reuse REF logic
        MatrixRefUtil.toREF(ref, m, n);

        int rank = 0;

        for (int i = 0; i < m; i++) {
            boolean nonZeroRow = false;
            for (int j = 0; j < n; j++) {
                if (Math.abs(ref[i * n + j]) > MatrixRefUtil.EPS) {
                    nonZeroRow = true;
                    break;
                }
            }
            if (nonZeroRow) rank++;
        }

        return rank;
    }
}
