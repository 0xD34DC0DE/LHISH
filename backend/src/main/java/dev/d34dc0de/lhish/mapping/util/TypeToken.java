package dev.d34dc0de.lhish.mapping.util;

import java.util.List;

public class TypeToken {
    private final Class<?> baseType;
    private final Class<?> genericType;

    public TypeToken(Class<?> baseType, Class<?> genericType) {
        this.baseType = baseType;
        this.genericType = genericType;
    }

    public static TypeToken of(Class<?> type) {
        return new TypeToken(type, NoClass.class);
    }

    public static TypeToken of(Class<?> baseType, Class<?> genericType) {
        return new TypeToken(baseType, genericType);
    }

    public static TypeToken ofList(Class<?> genericType) {
        return of(List.class, genericType);
    }

    public Class<?> getBaseType() {
        return baseType;
    }

    public Class<?> getGenericType() {
        return genericType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TypeToken that = (TypeToken) o;

        if (genericType != that.genericType) return false;
        return baseType == that.baseType;
    }

    @Override
    public int hashCode() {
        int result = baseType.hashCode();
        result = 31 * result + genericType.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "TypeToken{" +
                "baseType=" + baseType +
                ", genericType=" + genericType +
                '}';
    }
}
