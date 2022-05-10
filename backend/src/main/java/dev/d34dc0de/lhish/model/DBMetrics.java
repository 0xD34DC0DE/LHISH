package dev.d34dc0de.lhish.model;

import lombok.Data;
import org.bson.Document;

@Data
public class DBMetrics {
    private Integer count;
    private Integer avgObjectSize;
    private Integer storageSize;

    public DBMetrics(Document stats) {
        count = stats.getInteger("count");
        avgObjectSize = stats.getInteger("avgObjSize");
        storageSize = stats.getInteger("storageSize");
    }
}
