package dev.d34dc0de.lhish.exceptions;

public class MapperNotFoundException extends APIException{
    public MapperNotFoundException(Class<?> sourceClass, Class<?> targetClass) {
        super("No mapping method found for " + sourceClass.getSimpleName() + " to " + targetClass.getSimpleName());
    }
}
