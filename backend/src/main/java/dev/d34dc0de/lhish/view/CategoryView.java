package dev.d34dc0de.lhish.view;

import lombok.Builder;

public record CategoryView(String id, String name, String description, String imageId) {
    @Builder
    public CategoryView {}
}


