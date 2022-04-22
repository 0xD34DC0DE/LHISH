package dev.d34dc0de.lhish.model;

import dev.d34dc0de.lhish.model.enums.ValueType;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
public class ValueField {
    private String name;
    private Map<String, Object> values;
    private ValueType type;

    @Builder
    public ValueField(String name, Map<String, Object> values, ValueType type) {
        this.name = name;
        this.values = values;
        this.type = type;
    }
};
