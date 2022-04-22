package dev.d34dc0de.lhish.view;

import lombok.Builder;

import java.util.List;

public record ItemView(
        String id,
        String name,
        String description,
        String imageId,
        String historyId,
        List<ValueFieldView> fields
) {
    @Builder
    public ItemView {
    }
}
