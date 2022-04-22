package dev.d34dc0de.lhish.form;

import dev.d34dc0de.lhish.model.ValueField;
import lombok.Builder;

import java.util.List;

public record TemplateCreationForm(String name, List<ValueField> fields, Boolean isNewTemplate) {
    @Builder
    public TemplateCreationForm{}
}
