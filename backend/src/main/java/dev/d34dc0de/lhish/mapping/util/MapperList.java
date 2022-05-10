package dev.d34dc0de.lhish.mapping.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public record MapperList(List<MapperWithOption> list) {

    public MapperList() {
        this(new ArrayList<>());
    }

    /**
     * Adds a mapper to the list.
     *
     * @param mappingMethodInfo the mapping method info
     */
    public void add(MappingMethodInfo mappingMethodInfo) {
        MapperFunction function = new MapperFunction(mappingMethodInfo.method());
        list.add(new MapperWithOption(mappingMethodInfo.option(), function));
    }

    /**
     * Finds the first mapper with the given option.
     *
     * @param option the option to find
     * @return Optional containing the mapper or empty if not found
     */
    public Optional<MapperFunction> findByOption(String option) {
        return list.stream()
                .filter(mapperWithOption -> mapperWithOption.option().equals(option))
                .map(MapperWithOption::function)
                .findFirst();
    }

    /**
     * Get the first mapper regardless of the option.
     *
     * @return Optional containing the mapper or empty not mapper are present
     */
    public Optional<MapperFunction> getFirst() {
        return list.stream().findFirst().map(MapperWithOption::function);
    }
}
