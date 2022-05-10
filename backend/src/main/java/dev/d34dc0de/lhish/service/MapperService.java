package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.mapping.util.TypeToken;
import dev.d34dc0de.lhish.exceptions.EmptyListException;
import dev.d34dc0de.lhish.exceptions.MapperNotFoundException;
import dev.d34dc0de.lhish.mapping.util.MapperList;
import dev.d34dc0de.lhish.mapping.util.MapperRegistry;
import dev.d34dc0de.lhish.mapping.util.TypeTokenMap;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

@Service
public class MapperService {

    private final MapperRegistry mapperRegistry;

    public MapperService(MapperRegistry mapperRegistry) {
        this.mapperRegistry = mapperRegistry;
    }

    private TypeTokenMap<TypeTokenMap<MapperList>> getRegistry() {
        return mapperRegistry.getRegistry();
    }


    private Class<?> getInterfaceIfRegistered(Class<?> clazz) {
       return mapperRegistry.getRegisteredInterface(clazz).orElse(clazz);
    }

    /**
     * Apply the mappers to the given source object if there are any mappers for the given source and target.
     *
     * @param object object that represents the source type and the object to be mapped to the target type
     * @param target target type
     * @param <T>    return type to cast the result to
     * @return the mapped object
     */
    public <T> T map(Object object, Class<T> target) {
        TypeToken sourceTypeToken = TypeToken.of(getInterfaceIfRegistered(object.getClass()));
        TypeToken targetTypeToken = TypeToken.of(target);
        return mapInternal(object, target, sourceTypeToken, targetTypeToken);
    }

    /**
     * Same as {@link #map(Object, Class)} but with an option to select the right mapper
     * in case there are multiple mappers for the given source and target.
     */
    public <T> T map(Object object, Class<T> target, String option) {
        TypeToken sourceTypeToken = TypeToken.of(object.getClass());
        TypeToken targetTypeToken = TypeToken.of(target);
        return mapInternalWithOption(object, target, sourceTypeToken, targetTypeToken, option);
    }

    /**
     * Same as {@link #map(Object, Class)} but for source lists
     *
     * @param list       list of source objects that represent the source type and the objects to be mapped to the target type
     * @param targetType target type
     * @param <T>        return type to cast the result to
     * @return the mapped list
     */
    public <T> T mapFromList(List<?> list, Class<T> targetType) {
        Class<?> listType = getListTypeOrThrowIfEmpty(list);
        TypeToken sourceTypeToken = TypeToken.ofList(listType);
        TypeToken targetTypeToken = TypeToken.of(targetType);
        return mapInternal(list, targetType, sourceTypeToken, targetTypeToken);
    }

    /**
     * Same as {@link #map(Object, Class)} but for List targets
     *
     * @param object     object that represents the source type and the object to be mapped to the target type
     * @param targetType generic type of the target list
     * @param <T>        return type to cast the result to
     * @return the mapped list
     */
    public <T> List<T> mapToList(Object object, Class<T> targetType) {
        TypeToken sourceTypeToken = TypeToken.of(object.getClass());
        TypeToken targetTypeToken = TypeToken.ofList(targetType);
        return mapToListInternal(object, targetType, sourceTypeToken, targetTypeToken);
    }

    public <T> List<T> mapFromListToList(List<?> list, Class<T> targetType) {
        Class<?> listType = getListTypeOrThrowIfEmpty(list);
        TypeToken sourceTypeToken = TypeToken.ofList(listType);
        TypeToken targetTypeToken = TypeToken.ofList(targetType);
        return mapToListInternal(list, targetType, sourceTypeToken, targetTypeToken);
    }

    /**
     * Get the mapper list for the given source and target.
     *
     * @param sourceType source type
     * @param targetType target type
     * @return Optional containing the mapper list or empty if there are no mappers for the given source and target
     */
    private Optional<MapperList> getMapperList(TypeToken sourceType, TypeToken targetType) {
        return getRegistry().find(sourceType).flatMap(map -> map.find(targetType));
    }

    /**
     * Apply the mappers to the given source object if there are any mappers for the given source and target.
     *
     * @param source     source object that represents the source type and the object to be mapped to the target type
     * @param target     target type
     * @param sourceType source type
     * @param targetType target type
     * @param <T>        return type to cast the result to
     * @return the mapped object
     * @throws MapperNotFoundException if no mapper is found
     */
    private <T> T mapInternal(Object source, Class<T> target, TypeToken sourceType, TypeToken targetType) {
        return getMapperList(sourceType, targetType)
                .flatMap(MapperList::getFirst)
                .map(method -> method.<T>apply(source))
                .orElseThrow(getMapperNotFoundException(source, target));
    }

    /**
     * Same as {@link #mapInternal(Object, Class, TypeToken, TypeToken)} but with option
     *
     * @param source     source object that represents the source type and the object to be mapped to the target type
     * @param target     target type
     * @param sourceType source type
     * @param targetType target type
     * @param option     option to select the right mapper in case there are multiple mappers for the given source and target
     * @param <T>        return type to cast the result to
     * @return the mapped object
     * @throws MapperNotFoundException if no mapper is found
     */
    private <T> T mapInternalWithOption(Object source,
                                        Class<T> target,
                                        TypeToken sourceType,
                                        TypeToken targetType,
                                        String option) {
        return getMapperList(sourceType, targetType)
                .flatMap(list -> list.findByOption(option))
                .map(mapper -> mapper.<T>apply(source))
                .orElseThrow(getMapperNotFoundException(source, target));
    }

    /**
     * Same as {@link #mapInternal(Object, Class, TypeToken, TypeToken)} but for a list target.
     *
     */
    private <T> List<T> mapToListInternal(Object source, Class<T> target, TypeToken sourceType, TypeToken targetType) {
        return getMapperList(sourceType, targetType)
                .flatMap(MapperList::getFirst)
                .map(mapper -> mapper.<List<T>>apply(source))
                .orElseThrow(getMapperNotFoundException(source, target));
    }

    private Class<?> getListTypeOrThrowIfEmpty(List<?> list) {
        if (list.isEmpty()) {
            throw new EmptyListException("No elements");
        } else {
            return list.get(0).getClass();
        }
    }

    /**
     * Get a supplier for the exception that will be thrown when no mapper is found.
     *
     * @param source The source object.
     * @param target The target type.
     * @param <T>    The target type.
     * @return Exception supplier.
     */
    private <T> Supplier<MapperNotFoundException> getMapperNotFoundException(Object source, Class<T> target) {
        return () -> new MapperNotFoundException(source.getClass(), target);
    }

}
