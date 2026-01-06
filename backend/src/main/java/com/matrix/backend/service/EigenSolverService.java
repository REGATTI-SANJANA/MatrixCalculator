package com.matrix.backend.service;

import com.matrix.backend.model.EigenResponse;
import org.ejml.data.DMatrixRMaj;
import org.ejml.dense.row.factory.DecompositionFactory_DDRM;
import org.ejml.interfaces.decomposition.EigenDecomposition_F64;
import org.springframework.stereotype.Service;

@Service
public class EigenSolverService {

    /**
     * Computes eigenvalues and eigenvectors of a square matrix.
     *
     * @param m      number of rows
     * @param n      number of columns
     * @param matrix 1D row-major matrix (size m*n)
     * @return EigenResponse containing eigenvalues and eigenvectors
     */
    public static EigenResponse computeEigen(int m, int n, double[] matrix) {

        if (m != n) {
            throw new IllegalArgumentException(
                "Eigenvalues are defined only for square matrices"
            );
        }

        if (matrix.length != m * n) {
            throw new IllegalArgumentException(
                "Matrix size does not match given dimensions"
            );
        }

        // Convert to EJML matrix
        DMatrixRMaj A = new DMatrixRMaj(n, n);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                A.set(i, j, matrix[i * n + j]);
            }
        }

        // Eigen decomposition (QR algorithm internally)
        EigenDecomposition_F64<DMatrixRMaj> eig =
                DecompositionFactory_DDRM.eig(n, true);

        if (!eig.decompose(A)) {
            throw new RuntimeException("Eigen decomposition failed");
        }

        double[] eigenValues = new double[n];
        double[] eigenVectors = new double[n * n]; // column-wise

        for (int k = 0; k < n; k++) {

            // Real part of eigenvalue
            eigenValues[k] = eig.getEigenvalue(k).getReal();

            // Corresponding eigenvector
            DMatrixRMaj v = eig.getEigenVector(k);

            if (v != null) {
                for (int i = 0; i < n; i++) {
                    // column-wise linear indexing
                    eigenVectors[i * n + k] = v.get(i, 0);
                }
            }
        }

        EigenResponse response = new EigenResponse();
        response.setEigenValues(eigenValues);
        response.setEigenVectors(eigenVectors);

        return response;
    }
}
