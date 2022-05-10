package dev.d34dc0de.lhish.form;

import dev.d34dc0de.lhish.model.ValueField;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class TemplateCreationForm implements Serializable {

    private final String name;
    private final List<ValueField> fields;
    private final Boolean isNewTemplate;

    @Builder
    TemplateCreationForm(String name, List<ValueField> fields, Boolean isNewTemplate) {
        this.name = name;
        this.fields = fields;
        this.isNewTemplate = isNewTemplate;
    }

    public TemplateCreationForm(TemplateCreationForm other) {
        this.name = other.name;
        this.fields = other.getFields().stream().map(ValueField::new).toList();;
        this.isNewTemplate = other.isNewTemplate;
    }
}
