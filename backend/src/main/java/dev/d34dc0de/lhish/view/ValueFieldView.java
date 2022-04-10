package dev.d34dc0de.lhish.view;

import dev.d34dc0de.lhish.model.enums.FieldLayout;
import dev.d34dc0de.lhish.model.enums.ValueType;
import lombok.Builder;

public record ValueFieldView(String name, Object value, ValueType type, FieldLayout layout) {
    @Builder
    public ValueFieldView {
    }
}
