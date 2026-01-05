package com.matrix.backend.service;

import org.springframework.stereotype.Service;

@Service
public class TransposeService {

    public double[] transpose(int r, int c, double[] a) {

        double[] t = new double[r * c];

        for (int i = 0; i < r * c; i++) {
            int row = i / c;
            int col = i % c;

            t[col * r + row] = a[i];   // same linear logic
        }
        return t;
    }
}