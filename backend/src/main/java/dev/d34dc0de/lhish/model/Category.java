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
@Document("categories")
public class Category {
    @Id
    String id;
    String userId;
    String name;
    String description;
    String imageId;
}
