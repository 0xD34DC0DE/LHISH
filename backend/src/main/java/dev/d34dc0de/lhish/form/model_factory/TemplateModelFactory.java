package dev.d34dc0de.lhish.form.model_factory;

import dev.d34dc0de.lhish.form.TemplateCreationForm;
import dev.d34dc0de.lhish.model.Template;


public abstract class TemplateModelFactory {
    public static Template toModel(TemplateCreationForm form, Boolean isInstance) {
        return Template.builder()
                .name(form.name())
                .isInstance(isInstance)
                .valueFields(form.fields())
                .build();
    }
}
