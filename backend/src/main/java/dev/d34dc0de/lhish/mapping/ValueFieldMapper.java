package dev.d34dc0de.lhish.mapping;

import dev.d34dc0de.lhish.annotation.MappingMethod;
import dev.d34dc0de.lhish.annotation.MappingMethodListSource;
import dev.d34dc0de.lhish.annotation.MappingMethodListTarget;
import dev.d34dc0de.lhish.model.ValueField;
import dev.d34dc0de.lhish.view.ValueFieldView;
import dev.d34dc0de.lhish.view.view_factory.ValueFieldViewFactory;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ValueFieldMapper implements Mapper {

    @MappingMethod
    static public ValueFieldView toValueFieldView(ValueField valueField) {
        return ValueFieldView.builder()
                .name(valueField.getName())
                .value(valueField.getValues())
                .type(valueField.getType())
                .build();
    }

    @MappingMethod
    @MappingMethodListSource(ValueField.class)
    @MappingMethodListTarget(ValueFieldView.class)
    static public List<ValueFieldView> toValueFieldViewList(List<ValueField> valueFields) {
        return valueFields.stream().map(ValueFieldViewFactory::toValueFieldView).toList();
    }
}
