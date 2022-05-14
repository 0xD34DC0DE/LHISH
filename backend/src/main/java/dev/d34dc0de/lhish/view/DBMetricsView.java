package dev.d34dc0de.lhish.view;

import lombok.Builder;

public record DBMetricsView(Integer count, Integer avgObjectSize, Integer storageSize) {
    @Builder
    public DBMetricsView{}
}
