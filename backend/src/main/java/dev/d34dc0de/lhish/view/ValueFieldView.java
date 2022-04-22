package dev.d34dc0de.lhish.view;

import dev.d34dc0de.lhish.model.enums.ValueType;
import lombok.Builder;

import java.util.Map;

public record ValueFieldView(String name, Map<String, Object> value, ValueType type) {
    @Builder
    public ValueFieldView {
    }
}
