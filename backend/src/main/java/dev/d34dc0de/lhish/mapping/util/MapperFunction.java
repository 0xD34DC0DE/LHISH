package dev.d34dc0de.lhish.mapping.util;

import java.util.function.Function;

public record MapperFunction(Function<Object, Object> function) {
    /**
     * Apply the mapper function to the given object.
     *
     * @param arg the object to apply the mapper function to
     * @param <T> type to cast the result to
     * @return the result of the mapper function cast to the given type
     */
    @SuppressWarnings("unchecked")
    public <T> T apply(Object arg) {
        return (T) function.apply(arg);
    }
}
