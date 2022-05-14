package dev.d34dc0de.lhish.service.utils;

import dev.d34dc0de.lhish.exceptions.NullFieldException;

public abstract class CheckUtils {

    public static void throwIfNull(Object obj, String fieldName) {
        if (obj == null) {
            throw new NullFieldException(fieldName + " cannot be null");
        }
    }
}
