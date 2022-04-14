package dev.d34dc0de.lhish.form.model_factory;

import dev.d34dc0de.lhish.form.TemplateCreationForm;
import dev.d34dc0de.lhish.model.Template;
import dev.d34dc0de.lhish.model.ViewFields.ValueField;

import java.util.Objects;


public abstract class TemplateModelFactory {
    public static Template toModel(TemplateCreationForm form) {
        return Template.builder()
                .name(form.name())
                .isInstance(form.fields().stream().map(ValueField::getValue).allMatch(Objects::nonNull))
                .valueFields(form.fields())
                .build();
    }
}
