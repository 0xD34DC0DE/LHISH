package dev.d34dc0de.lhish.model;

import dev.d34dc0de.lhish.annotation.CascadeDelete;
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

    @CascadeDelete(Image.class)
    private String imageId;

    @CascadeDelete(ItemHistory.class)
    private String historyId;

    @CascadeDelete(Template.class)
    private String templateId;
}
