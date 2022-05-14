package dev.d34dc0de.lhish.mapping.util;

import dev.d34dc0de.lhish.annotation.*;

import java.lang.annotation.Annotation;
import java.lang.invoke.*;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Stream;

public abstract class MapperReflectionUtil {

    public static Stream<? extends Annotation> getMethodAnnotations(Class<?> clazz,
                                                                    Class<? extends Annotation> annotation) {
        return Arrays.stream(clazz.getDeclaredMethods())
                .filter(field -> field.isAnnotationPresent(annotation))
                .map(field -> field.getAnnotation(annotation));
    }

    public static Stream<MappingMethodInfo> getMappingMethodInfo(Class<?> clazz) {
        Method[] methods = clazz.getDeclaredMethods();

        return Arrays.stream(methods)
                .filter(method -> method.isAnnotationPresent(MappingMethod.class))
                .map(method -> {
                    if (method.getParameterTypes().length != 1) {
                        throw new IllegalArgumentException(
                                "Mapping method " + method.getName() + " has more than one parameter"
                        );
                    }
                    Function<Object, Object> function = convertMethodToFunction(method);
                    TypeToken source = getSourceTypeToken(method);
                    TypeToken target = getTargetTypeToken(method);

                    String option = getOption(method);
                    Optional<Class<?>> interfaceClass = getInterfaceClass(method);

                    return new MappingMethodInfo(source, target, function, option, interfaceClass);
                });
    }

    private static String getOption(Method method) {
        String option = "";
        if(method.isAnnotationPresent(MappingOption.class)) {
            MappingOption annotation = method.getAnnotation(MappingOption.class);
            option = annotation.name();
        }
        return option;
    }

    private static Optional<Class<?>> getInterfaceClass(Method method) {
        Optional<Class<?>> interfaceClass = Optional.empty();
        if(method.isAnnotationPresent(MappingMethodSourceInterface.class)) {
            MappingMethodSourceInterface annotation = method.getAnnotation(MappingMethodSourceInterface.class);
            interfaceClass = Optional.of(annotation.value());
        }
        return interfaceClass;
    }

    private static TypeToken getSourceTypeToken(Method method) {
        if (method.isAnnotationPresent(MappingMethodListSource.class)) {
            MappingMethodListSource annotation = method.getAnnotation(MappingMethodListSource.class);
            return TypeToken.ofList(annotation.value());
        }
        return new TypeToken(method.getParameterTypes()[0], NoClass.class);
    }

    private static TypeToken getTargetTypeToken(Method method) {
        if (method.isAnnotationPresent(MappingMethodListTarget.class)) {
            MappingMethodListTarget annotation = method.getAnnotation(MappingMethodListTarget.class);
            return TypeToken.ofList(annotation.value());
        }
        return new TypeToken(method.getReturnType(), NoClass.class);
    }

    private static Function<Object, Object> convertMethodToFunction(Method method) {
        try {
            MethodHandles.Lookup caller = MethodHandles.lookup();
            MethodHandle target = caller.unreflect(method);
            MethodType erasedType = target.type().erase();
            TypeToken sourceType = getSourceTypeToken(method);
            TypeToken targetType = getTargetTypeToken(method);

            CallSite callSite = LambdaMetafactory.metafactory(
                    caller,
                    "apply",
                    MethodType.methodType(Function.class),
                    erasedType,
                    target,
                    MethodType.methodType(
                            targetType.getBaseType(),
                            sourceType.getBaseType()
                    )
            );

            @SuppressWarnings("unchecked")
            Function<Object, Object> result = (Function<Object, Object>) callSite.getTarget().invoke();

            if (result != null) {
                return result;
            }
            throw new IllegalArgumentException("Mapping method " + method.getName() + " is not a function");
        } catch (Throwable e) {
            e.printStackTrace();
            return null;
        }
    }

    public static Stream<Class<?>> getInterfaces(Class<?> clazz) {
        return Arrays.stream(clazz.getInterfaces());
    }
}

