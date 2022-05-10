package dev.d34dc0de.lhish.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document("permissions")
public class Permission {
    @Id
    private String id;
    private String name;
    private Boolean status;
}
