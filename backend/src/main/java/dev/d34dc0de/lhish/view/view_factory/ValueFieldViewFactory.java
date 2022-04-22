package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.model.ValueField;
import dev.d34dc0de.lhish.view.ValueFieldView;

import java.util.List;

public abstract class ValueFieldViewFactory {
    static public ValueFieldView toValueFieldView(ValueField valueField) {
        return ValueFieldView.builder()
                .name(valueField.getName())
                .value(valueField.getValues())
                .type(valueField.getType())
                .build();
    }

    static public List<ValueFieldView> toValueFieldViewList(List<ValueField> valueFields) {
        return valueFields.stream().map(ValueFieldViewFactory::toValueFieldView).toList();
    }
}
