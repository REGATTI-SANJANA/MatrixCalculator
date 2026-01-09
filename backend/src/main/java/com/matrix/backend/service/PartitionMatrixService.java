
package com.matrix.backend.service;

import com.matrix.backend.model.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PartitionMatrixService {

    public PartitionMatrixResponse partition(
            int rows,
            int cols,
            double[] matrix,
            List<Integer> rowSplits,
            List<Integer> colSplits
    ) {

        // Normalize splits
        List<Integer> r = new ArrayList<>();
        List<Integer> c = new ArrayList<>();

        r.add(0);
        if (rowSplits != null) r.addAll(rowSplits);
        r.add(rows);

        c.add(0);
        if (colSplits != null) c.addAll(colSplits);
        c.add(cols);

        Collections.sort(r);
        Collections.sort(c);

        List<PartitionBlock> blocks = new ArrayList<>();

        for (int i = 0; i < r.size() - 1; i++) {
            for (int j = 0; j < c.size() - 1; j++) {

                int rStart = r.get(i);
                int rEnd = r.get(i + 1);
                int cStart = c.get(j);
                int cEnd = c.get(j + 1);

                int blockRows = rEnd - rStart;
                int blockCols = cEnd - cStart;

                double[] block = new double[blockRows * blockCols];

                for (int x = 0; x < blockRows; x++) {
                    for (int y = 0; y < blockCols; y++) {
                        block[x * blockCols + y] =
                                matrix[(rStart + x) * cols + (cStart + y)];
                    }
                }

                blocks.add(new PartitionBlock(blockRows, blockCols, block));
            }
        }

        return new PartitionMatrixResponse(
                blocks,
                r.size() - 1,
                c.size() - 1
        );
    }
}
