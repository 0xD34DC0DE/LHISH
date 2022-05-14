package dev.d34dc0de.lhish.mapping.util;

import java.util.Optional;
import java.util.function.Function;

public record MappingMethodInfo(
        TypeToken source,
        TypeToken target,
        Function<Object, Object> method,
        String option,
        Optional<Class<?>> interfaceClass) {
}
