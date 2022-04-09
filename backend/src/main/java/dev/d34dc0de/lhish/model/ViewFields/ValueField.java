package dev.d34dc0de.lhish.model.ViewFields;

import dev.d34dc0de.lhish.model.enums.FieldLayout;
import dev.d34dc0de.lhish.model.enums.FieldType;
import dev.d34dc0de.lhish.model.enums.ValueType;
import lombok.Data;

@Data
public abstract class ValueField {
    private String name;
    private Object value;
    private ValueType type;

    public ValueField(String name, Object value, ValueType type) {
        this.name = name;
        this.value = value;
        this.type = type;
    }

    public abstract FieldType getFieldType();

    public abstract FieldLayout getFieldLayout();
};
