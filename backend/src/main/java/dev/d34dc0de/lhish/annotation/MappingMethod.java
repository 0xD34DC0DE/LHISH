package dev.d34dc0de.lhish.annotation;

import dev.d34dc0de.lhish.mapping.util.NoClass;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MappingMethod {
    Class<?> source() default NoClass.class;
    Class<?> target() default NoClass.class;
}
