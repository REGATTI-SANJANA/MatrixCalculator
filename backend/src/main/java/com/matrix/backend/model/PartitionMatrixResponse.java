
package com.matrix.backend.model;

import java.util.List;

public class PartitionMatrixResponse {

    private List<PartitionBlock> blocks;
    private int blockRows;
    private int blockCols;

    public PartitionMatrixResponse(
            List<PartitionBlock> blocks,
            int blockRows,
            int blockCols
    ) {
        this.blocks = blocks;
        this.blockRows = blockRows;
        this.blockCols = blockCols;
    }

    public List<PartitionBlock> getBlocks() {
        return blocks;
    }

    public int getBlockRows() {
        return blockRows;
    }

    public int getBlockCols() {
        return blockCols;
    }
}
