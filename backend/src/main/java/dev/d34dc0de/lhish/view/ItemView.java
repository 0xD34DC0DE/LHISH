package dev.d34dc0de.lhish.view;

import lombok.Builder;

public record ItemView(String id, String name, String description, String imageId, String historyId) {
    @Builder
    public ItemView {};
}
