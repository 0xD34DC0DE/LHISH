package dev.d34dc0de.lhish.model.ViewFields;

import dev.d34dc0de.lhish.model.enums.ValueType;
import lombok.Builder;
import lombok.Data;

@Data
public class ValueField {
    private String name;
    private Object value;
    private ValueType type;

    @Builder
    public ValueField(String name, Object value, ValueType type) {
        this.name = name;
        this.value = value;
        this.type = type;
    }
};
