package dev.d34dc0de.lhish.model;

import dev.d34dc0de.lhish.model.ViewFields.ValueField;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
public class Template {
    @Id
    private String id;
    private String name;
    private boolean isCategoryTemplate;
    private Boolean isInstance;
    List<ValueField> valueFields;

    @Builder
    public Template(String id, String name, Boolean isInstance, List<ValueField> valueFields) {
        this.id = id;
        this.name = name;
        this.isCategoryTemplate = false; // Not implemented yet
        this.isInstance = isInstance;
        this.valueFields = valueFields;
    }
}
