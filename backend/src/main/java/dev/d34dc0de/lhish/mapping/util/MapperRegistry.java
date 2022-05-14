package dev.d34dc0de.lhish.mapping.util;

import dev.d34dc0de.lhish.annotation.MappingMethodSourceInterface;
import dev.d34dc0de.lhish.mapping.Mapper;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class MapperRegistry {

    private static Set<Class<?>> interfaces;

    private static TypeTokenMap<TypeTokenMap<MapperList>> registry;

    public MapperRegistry(List<Mapper> mappers) {
        MapperRegistry.registry = new TypeTokenMap<>(new HashMap<>());
        MapperRegistry.interfaces = new HashSet<>();
        registerMappers(mappers);
    }

    public TypeTokenMap<TypeTokenMap<MapperList>> getRegistry() {
        return registry;
    }

    /**
     * Returns the interface implemented by the given class if the interface was registered.
     * @param clazz the class to check
     * @return optional of the interface otherwise empty
     */
    public Optional<Class<?>> getRegisteredInterface(Class<?> clazz) {
         Class<?>[] clazzInterfaces = clazz.getInterfaces();
         return Arrays.stream(clazzInterfaces).filter(interfaces::contains).findFirst();
    }

    /**
     * Register mappers from classes that implement {@link Mapper}.
     *
     * @param mappers the mappers to register
     */
    private void registerMappers(List<Mapper> mappers) {
        mappers.stream()
                .map(Object::getClass)
                .flatMap(MapperReflectionUtil::getMappingMethodInfo)
                .peek(mappingMethodInfo -> mappingMethodInfo.interfaceClass().ifPresent(c -> interfaces.add(c)))
                .forEach(this::ensureRegisterMapper);
    }

    /**
     * Adds a mapper to the registry if it doesn't already exist.
     * If it does exist, add the mapper to the existing list.
     *
     * @param mappingMethodInfos the mapping method info
     */
    private void ensureRegisterMapper(MappingMethodInfo mappingMethodInfos) {
        registry.find(mappingMethodInfos.source())
                .ifPresentOrElse(sMap -> sMap.find(mappingMethodInfos.target())
                                .ifPresentOrElse(
                                        mapperList -> mapperList.add(mappingMethodInfos),
                                        () -> addNewTargetMap(sMap, mappingMethodInfos)
                                ),
                        () -> addNewSourceMap(mappingMethodInfos)
                );
    }

    /**
     * Adds a new target map to a given source map.
     *
     * @param sourceMap          the source map to add to
     * @param mappingMethodInfos the mapping method info
     */
    private void addNewTargetMap(TypeTokenMap<MapperList> sourceMap,
                                 MappingMethodInfo mappingMethodInfos) {
        MapperList mapperList = new MapperList();
        mapperList.add(mappingMethodInfos);
        sourceMap.put(mappingMethodInfos.target(), mapperList);
    }

    /**
     * Adds a new source map to the registry.
     *
     * @param mappingMethodInfos the mapping method info
     */
    private void addNewSourceMap(MappingMethodInfo mappingMethodInfos) {
        TypeTokenMap<MapperList> sourceMap = new TypeTokenMap<>();
        addNewTargetMap(sourceMap, mappingMethodInfos);
        registry.put(mappingMethodInfos.source(), sourceMap);
    }
}

