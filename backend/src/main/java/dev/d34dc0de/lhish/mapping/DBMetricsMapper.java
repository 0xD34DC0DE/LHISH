package dev.d34dc0de.lhish.mapping;

import dev.d34dc0de.lhish.annotation.MappingMethod;
import dev.d34dc0de.lhish.model.DBMetrics;
import dev.d34dc0de.lhish.view.DBMetricsView;
import org.springframework.stereotype.Component;

@Component
public class DBMetricsMapper implements Mapper {

    @MappingMethod
    public static DBMetricsView toDBMetricsView(DBMetrics dbMetrics) {
        return DBMetricsView.builder()
                .count(dbMetrics.getCount())
                .avgObjectSize(dbMetrics.getAvgObjectSize())
                .storageSize(dbMetrics.getStorageSize())
                .build();
    }

}
