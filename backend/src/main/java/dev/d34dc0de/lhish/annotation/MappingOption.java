package dev.d34dc0de.lhish.annotation;

import java.lang.annotation.Retention;

@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
public @interface MappingOption {
    String name();
}
