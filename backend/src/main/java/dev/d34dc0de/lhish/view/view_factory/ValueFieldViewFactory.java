package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.model.Template;
import dev.d34dc0de.lhish.model.ViewFields.ValueField;
import dev.d34dc0de.lhish.service.TemplateService;
import dev.d34dc0de.lhish.view.ValueFieldView;
import dev.d34dc0de.lhish.view.ValueFieldViewList;

import java.util.List;

public abstract class ValueFieldViewFactory {
    static public ValueFieldView toValueFieldView(ValueField valueField) {
        return ValueFieldView.builder()
                .name(valueField.getName())
                .type(valueField.getType())
                .type(valueField.getType())
                .build();
    }
}
