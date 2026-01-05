package com.matrix.backend.service;

import com.matrix.backend.model.MatrixSpacesResponse;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MatrixSpacesService {

    private static final double EPS = 1e-9;

    /* ================= REF ================= */
  private int[] getPivotColumns(double[] ref, int m, int n) {

    int[] pivotCol = new int[m];
    Arrays.fill(pivotCol, -1);

    int row = 0;

    for (int col = 0; col < n && row < m; col++) {
        if (Math.abs(ref[row * n + col]) > EPS) {
            pivotCol[row] = col;
            row++;
        }
    }
    return pivotCol;
}



    /* ================= RREF (from REF) ================= */
    private void refToRref(double[] ref, int m, int n, int[] pivotCol) {

        for (int i = 0; i < m; i++) {
            if (pivotCol[i] != -1) {
                double pivot = ref[i * n + pivotCol[i]];
                for (int j = pivotCol[i]; j < n; j++)
                    ref[i * n + j] /= pivot;
            }
        }

        for (int i = m - 1; i >= 0; i--) {
            if (pivotCol[i] != -1) {
                int pc = pivotCol[i];
                for (int r = 0; r < i; r++) {
                    double factor = ref[r * n + pc];
                    for (int j = pc; j < n; j++)
                        ref[r * n + j] -= factor * ref[i * n + j];
                }
            }
        }
    }

    /* ================= ALL SPACES ================= */
    public MatrixSpacesResponse computeSpaces(int m, int n, double[] A) {

    // Copy A → ref
    double[] ref = A.clone();

    // Convert to REF (safe: does not alter original A)
    MatrixRefUtil.toREF(ref, m, n);

    // Extract pivot columns
    int[] pivotCol = getPivotColumns(ref, m, n);

    /* -------- Row Space -------- */
    List<double[]> rowSpace = new ArrayList<>();
    for (int i = 0; i < m; i++) {
        boolean nonZero = false;
        for (int j = 0; j < n; j++)
            if (Math.abs(ref[i * n + j]) > EPS)
                nonZero = true;

        if (nonZero) {
            double[] row = new double[n];
            System.arraycopy(ref, i * n, row, 0, n);
            rowSpace.add(row);
        }
    }

    /* -------- Column Space -------- */
    List<double[]> columnSpace = new ArrayList<>();
    for (int p : pivotCol) {
        if (p != -1) {
            double[] col = new double[m];
            for (int i = 0; i < m; i++)
                col[i] = A[i * n + p]; // ORIGINAL A
            columnSpace.add(col);
        }
    }

    /* -------- Null Space -------- */
    double[] rref = ref.clone();
    refToRref(rref, m, n, pivotCol);

    boolean[] isPivot = new boolean[n];
    for (int p : pivotCol)
        if (p != -1) isPivot[p] = true;

    List<double[]> nullSpace = new ArrayList<>();
    for (int free = 0; free < n; free++) {
        if (!isPivot[free]) {
            double[] v = new double[n];
            v[free] = 1;
            for (int i = 0; i < m; i++)
                if (pivotCol[i] != -1)
                    v[pivotCol[i]] = -rref[i * n + free];
            nullSpace.add(v);
        }
    }

    return new MatrixSpacesResponse(rowSpace, columnSpace, nullSpace);
}
}