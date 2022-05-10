package dev.d34dc0de.lhish.mapping.util;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public record TypeTokenMap<T>(Map<TypeToken, T> map) {
    public TypeTokenMap() {
        this(new HashMap<>());
    }

    public Optional<T> find(TypeToken typeToken) {
        return Optional.ofNullable(map.get(typeToken));
    }

    public void put(TypeToken key, T value) {
        map.put(key, value);
    }
}
