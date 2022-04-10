package dev.d34dc0de.lhish.model.ViewFields;

import dev.d34dc0de.lhish.model.enums.FieldLayout;
import dev.d34dc0de.lhish.model.enums.FieldType;
import dev.d34dc0de.lhish.model.enums.ValueType;

public class TextField extends ValueField {

    public TextField(String name, Object value) {
        super(name, value, ValueType.STRING);
    }

    @Override
    public FieldType getFieldType() {
        return FieldType.SINGLE;
    }

    @Override
    public FieldLayout getFieldLayout() {
        return FieldLayout.BLOCK;
    }
}
