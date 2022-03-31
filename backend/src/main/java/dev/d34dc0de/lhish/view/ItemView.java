package dev.d34dc0de.lhish.view;

import lombok.Builder;

public record ItemView(String id, String name, String description, String image) {
    @Builder
    public ItemView {};
}
