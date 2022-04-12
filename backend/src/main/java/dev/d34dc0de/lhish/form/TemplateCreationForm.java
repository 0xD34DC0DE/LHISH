package dev.d34dc0de.lhish.form;

import dev.d34dc0de.lhish.model.ViewFields.ValueField;
import lombok.Builder;

import java.util.List;

public record TemplateCreationForm(String name, List<ValueField> fields) {
    @Builder
    public TemplateCreationForm{}
}
