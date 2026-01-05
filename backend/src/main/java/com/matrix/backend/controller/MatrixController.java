package com.matrix.backend.controller;

import com.matrix.backend.model.MatrixRequest;
import com.matrix.backend.model.MatrixResponse;
import com.matrix.backend.service.TraceService;
import com.matrix.backend.service.TransposeService;
import com.matrix.backend.service.DeterminantService;
import com.matrix.backend.service.RankService;
import com.matrix.backend.service.InverseService;

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

    public MatrixController(
            TraceService traceService,
            TransposeService transposeService,
            DeterminantService determinantService,
            RankService rankService,
            InverseService inverseService) {

        this.traceService = traceService;
        this.transposeService = transposeService;
        this.determinantService = determinantService;
        this.rankService = rankService;
        this.inverseService = inverseService;
    }

    // Submit matrix (no storage, just echo)
    @PostMapping("/submit")
    public MatrixResponse submitMatrix(@RequestBody MatrixRequest request) {
        MatrixResponse response = new MatrixResponse();
        response.setOriginalMatrix(request.getMatrix());
        response.setRows(request.getRows());
        response.setCols(request.getCols());
        return response;
    }

    // Trace
   @PostMapping("/trace")
public MatrixResponse getTrace(@RequestBody MatrixRequest request) {
    MatrixResponse response = new MatrixResponse();

    if (request.getRows() != request.getCols()) {
        throw new RuntimeException("Trace not possible for rectangular matrix");
    }

    double trace = traceService.trace(
        request.getRows(),
        request.getCols(),
        request.getMatrix()
    );

    response.setTrace(trace);
    return response;
}


    // Determinant
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

    // Transpose
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

    // Rank
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

    // Inverse
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
    } catch (ArithmeticException | IllegalArgumentException ex) {
        response.setMessage("Inverse is not possible because determinant is zero");
    }

    return response;
}



}
