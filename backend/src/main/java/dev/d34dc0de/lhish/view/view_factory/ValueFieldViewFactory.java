package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.model.Template;
import dev.d34dc0de.lhish.model.ViewFields.ValueField;
import dev.d34dc0de.lhish.service.TemplateService;
import dev.d34dc0de.lhish.view.ValueFieldView;

import java.util.List;

public abstract class ValueFieldViewFactory {
    static public ValueFieldView toValueFieldView(ValueField valueField) {
        return ValueFieldView.builder()
                .name(valueField.getName())
                .type(valueField.getType())
                .type(valueField.getType())
                .layout(valueField.getFieldLayout())
                .build();
    }

    static public List<ValueFieldView> toValueFieldViewList(TemplateService templateService, Template template) {
        return templateService.getValueFields(template).stream()
                .map(ValueFieldViewFactory::toValueFieldView)
                .toList();
    }
}
