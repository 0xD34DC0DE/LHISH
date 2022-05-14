package dev.d34dc0de.lhish.repository.utils;

import org.springframework.core.annotation.AnnotationUtils;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.Optional;

public abstract class RepositoryReflectionUtil {

    /**
     * Try to get annotation value from the given field.
     * @return Optional of the value.
     */
    public static Optional<Class<?>> getAnnotationValue(Field field, Class<? extends Annotation> annotationClass) {
        return Optional.ofNullable(AnnotationUtils.getAnnotation(field, annotationClass))
                        .map(annotation -> AnnotationUtils.getValue(annotation, "value"))
                        .map(o -> (Class<?>) o);
    }

    /**
     * Try to get the value of a field as a string.
     * @return Optional of the value.
     */
    public static <T> Optional<String> getStringValue(Field field, T instance) {
        try {
            field.setAccessible(true);
            Object value = field.get(instance);
            return Optional.of(value.toString());
        } catch (IllegalAccessException e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

}
