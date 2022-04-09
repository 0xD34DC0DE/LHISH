package dev.d34dc0de.lhish.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document("items")
public class Item {
    @Id
    private String id;
    private String name;
    private String description;
    private String categoryId;
    private String userId;
    private String imageId;
    private String historyId;
    private String templateId;
}
