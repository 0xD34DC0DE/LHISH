package dev.d34dc0de.lhish.form.model_factory;

import dev.d34dc0de.lhish.form.TemplateCreationForm;
import dev.d34dc0de.lhish.model.Template;


public abstract class TemplateModelFactory {
    public static Template toInstanceTemplateModel(TemplateCreationForm form) {
        return Template.builder()
                .name(form.name())
                .isInstance(true)
                .valueFields(form.fields())
                .build();
    }

    public static Template toNonInstanceTemplateModel(TemplateCreationForm form) {
        return Template.builder()
                .name(form.name())
                .isInstance(false)
                .valueFields(form.fields())
                .build();
    }
}
