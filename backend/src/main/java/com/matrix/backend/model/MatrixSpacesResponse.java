package com.matrix.backend.model;

import java.util.List;

public class MatrixSpacesResponse {

    private List<double[]> rowSpace;
    private List<double[]> columnSpace;
    private List<double[]> nullSpace;

    public MatrixSpacesResponse(
            List<double[]> rowSpace,
            List<double[]> columnSpace,
            List<double[]> nullSpace) {
        this.rowSpace = rowSpace;
        this.columnSpace = columnSpace;
        this.nullSpace = nullSpace;
    }

    public List<double[]> getRowSpace() { return rowSpace; }
    public List<double[]> getColumnSpace() { return columnSpace; }
    public List<double[]> getNullSpace() { return nullSpace; }
}
