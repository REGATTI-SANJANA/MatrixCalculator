package com.matrix.backend.service;

import org.springframework.stereotype.Service;

@Service
public class TraceService {

    public Double trace(int r, int c, double[] a) {

        if (r != c) {
            return null;
        }

        double sum = 0;
        int total = c * c;

        for (int i = 0; i < total; i++) {
            int row = i / c;
            int col = i % c;

            if (row == col) {
                sum += a[i];
            }
        }
        return sum;
    }
}
