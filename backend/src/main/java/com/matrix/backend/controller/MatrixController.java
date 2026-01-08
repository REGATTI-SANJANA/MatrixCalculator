package com.matrix.backend.controller;

import com.matrix.backend.model.*;
import com.matrix.backend.service.*;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/matrix")
public class MatrixController {

    private final TraceService traceService;
    private final TransposeService transposeService;
    private final DeterminantService determinantService;
    private final RankService rankService;
    private final InverseService inverseService;
    private final MatrixSpacesService matrixSpacesService;
    private final AdjointService adjointService;
    private final MatrixIndexService matrixIndexService;
    private final EigenSolverService eigenSolverService;
    private final SubMatrixService subMatrixService;
    private final MatrixMultiplicationService multiplicationService;
    private final PartitionMatrixService partitionMatrixService;

    public MatrixController(
            TraceService traceService,
            TransposeService transposeService,
            DeterminantService determinantService,
            RankService rankService,
            InverseService inverseService,
            MatrixSpacesService matrixSpacesService,
            AdjointService adjointService,
            MatrixIndexService matrixIndexService,
            EigenSolverService eigenSolverService,
            SubMatrixService subMatrixService,
            MatrixMultiplicationService multiplicationService,
            PartitionMatrixService partitionMatrixService
    ) {
        this.traceService = traceService;
        this.transposeService = transposeService;
        this.determinantService = determinantService;
        this.rankService = rankService;
        this.inverseService = inverseService;
        this.matrixSpacesService = matrixSpacesService;
        this.adjointService = adjointService;
        this.matrixIndexService = matrixIndexService;
        this.eigenSolverService = eigenSolverService;
        this.subMatrixService = subMatrixService;
        this.multiplicationService=multiplicationService;
        this.partitionMatrixService= partitionMatrixService;
    }

    // ===== SUBMIT =====
    @PostMapping("/submit")
    public MatrixResponse submitMatrix(@RequestBody MatrixRequest request) {
        MatrixResponse response = new MatrixResponse();
        response.setOriginalMatrix(request.getMatrix());
        response.setRows(request.getRows());
        response.setCols(request.getCols());
        return response;
    }

    // ===== TRACE =====
    @PostMapping("/trace")
    public MatrixResponse getTrace(@RequestBody MatrixRequest request) {
        if (request.getRows() != request.getCols()) {
            throw new RuntimeException("Trace not possible for rectangular matrix");
        }

        MatrixResponse response = new MatrixResponse();
        response.setTrace(traceService.trace(
                request.getRows(),
                request.getCols(),
                request.getMatrix()
        ));
        return response;
    }

    // ===== DETERMINANT =====
    @PostMapping("/determinant")
    public MatrixResponse getDeterminant(@RequestBody MatrixRequest request) {
        MatrixResponse response = new MatrixResponse();
        response.setDeterminant(
                determinantService.calculateDeterminant(
                        request.getRows(),
                        request.getCols(),
                        request.getMatrix()
                )
        );
        return response;
    }

    // ===== TRANSPOSE =====
    @PostMapping("/transpose")
    public MatrixResponse getTranspose(@RequestBody MatrixRequest request) {
        MatrixResponse response = new MatrixResponse();
        response.setTranspose(
                transposeService.transpose(
                        request.getRows(),
                        request.getCols(),
                        request.getMatrix()
                )
        );
        return response;
    }

    // ===== RANK =====
    @PostMapping("/rank")
    public MatrixResponse getRank(@RequestBody MatrixRequest request) {
        MatrixResponse response = new MatrixResponse();
        response.setRank(
                rankService.calculateRank(
                        request.getRows(),
                        request.getCols(),
                        request.getMatrix()
                )
        );
        return response;
    }

    // ===== INVERSE =====
    @PostMapping("/inverse")
    public MatrixResponse getInverse(@RequestBody MatrixRequest request) {
        MatrixResponse response = new MatrixResponse();
        try {
            response.setInverse(
                    inverseService.calculateInverse(
                            request.getRows(),
                            request.getCols(),
                            request.getMatrix()
                    )
            );
        } catch (Exception e) {
            response.setMessage("Inverse not possible (determinant is zero)");
        }
        return response;
    }

    // ===== ADJOINT =====
    @PostMapping("/adjoint")
    public MatrixResponse getAdjoint(@RequestBody MatrixRequest request) {
        MatrixResponse response = new MatrixResponse();
        response.setAdjoint(
                adjointService.calculateAdjoint(
                        request.getRows(),
                        request.getMatrix()
                )
        );
        return response;
    }

    // ===== ROW =====
    @PostMapping("/row")
    public MatrixResponse getRow(@RequestBody MatrixRequest request) {
        MatrixResponse response = new MatrixResponse();
        response.setRow(
                matrixIndexService.getRow(
                        request.getRows(),
                        request.getCols(),
                        request.getMatrix(),
                        request.getIndex()
                )
        );
        return response;
    }

    // ===== COLUMN =====
    @PostMapping("/column")
    public MatrixResponse getColumn(@RequestBody MatrixRequest request) {
        MatrixResponse response = new MatrixResponse();
        response.setColumn(
                matrixIndexService.getColumn(
                        request.getRows(),
                        request.getCols(),
                        request.getMatrix(),
                        request.getIndex()
                )
        );
        return response;
    }

    // ===== SPACES =====
    @PostMapping("/spaces")
    public MatrixSpacesResponse getSpaces(@RequestBody MatrixRequest request) {
        return matrixSpacesService.computeSpaces(
                request.getRows(),
                request.getCols(),
                request.getMatrix()
        );
    }

    // ===== EIGEN =====
    @PostMapping("/eigen")
    public EigenResponse getEigen(@RequestBody MatrixRequest request) {
        return EigenSolverService.computeEigen(
                request.getRows(),
                request.getCols(),
                request.getMatrix()
        );
    }

    // ===== SUB MATRIX =====
    @PostMapping("/submatrix")
public MatrixResponse getSubMatrix(@RequestBody MatrixRequest request) {

    if (request.getStartRow() == null ||
        request.getEndRow() == null ||
        request.getStartCol() == null ||
        request.getEndCol() == null) {
        throw new IllegalArgumentException("Submatrix indices cannot be null");
    }

    MatrixResponse response = new MatrixResponse();

    double[] sub = subMatrixService.getSubMatrix(
            request.getRows(),
            request.getCols(),
            request.getMatrix(),
            request.getStartRow(),
            request.getEndRow(),
            request.getStartCol(),
            request.getEndCol()
    );

    int subRows = request.getEndRow() - request.getStartRow() + 1;
    int subCols = request.getEndCol() - request.getStartCol() + 1;

    response.setSubMatrix(sub);
    response.setSubRows(subRows);
    response.setSubCols(subCols);

    return response;
}
@PostMapping("/multiply")
public MatrixMultiplyResponse multiply(@RequestBody MatrixMultiplyRequest request) {

    MatrixMultiplyResponse response = new MatrixMultiplyResponse();

    if (request.getColsA() != request.getRowsB()) {
        response.setMessage(
            "Matrix multiplication not possible: columns of A must equal rows of B"
        );
        return response;
    }

    double[] result = multiplicationService.multiply(
            request.getRowsA(),
            request.getColsA(),
            request.getMatrixA(),
            request.getRowsB(),
            request.getColsB(),
            request.getMatrixB()
    );

    response.setRows(request.getRowsA());
    response.setCols(request.getColsB());
    response.setProduct(result);

    return response;
}

@PostMapping("/partition")
public PartitionMatrixResponse partitionMatrix(@RequestBody MatrixRequest request) {

    return partitionMatrixService.partition(
            request.getRows(),
            request.getCols(),
            request.getMatrix(),
            request.getIndex(),      // row split
            request.getStartCol()    // column split
    );
}


}
