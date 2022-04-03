package dev.d34dc0de.lhish.view;

import lombok.Builder;

import java.util.List;

public record CategoryIdNamePairListView(List<String> categoryIds, List<String> categoryNames) {
    @Builder
    public CategoryIdNamePairListView {}
}
