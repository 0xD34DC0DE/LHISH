package dev.d34dc0de.lhish.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface MappingMethodSourceInterface {
    Class<?> value();
}
