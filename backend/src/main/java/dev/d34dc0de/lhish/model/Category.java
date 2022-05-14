package dev.d34dc0de.lhish.model;

import dev.d34dc0de.lhish.annotation.CascadeDelete;
import lombok.*;
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

    @CascadeDelete(Image.class)
    String imageId;
}
