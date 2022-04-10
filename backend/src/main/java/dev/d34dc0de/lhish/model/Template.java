package dev.d34dc0de.lhish.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
public class Template {
    @Id
    private String id;
    private boolean isCategoryTemplate;
    List<String> valueFieldsIds;

    @Builder
    public Template(String id, List<String> valueFieldsIds) {
        this.id = id;
        this.isCategoryTemplate = false; // Not implemented yet
        this.valueFieldsIds = valueFieldsIds;
    }
}
