package dev.d34dc0de.lhish.view;

import lombok.Builder;

import java.util.List;

public record CategoryIdListView(List<String> categoryIds) {
    @Builder
    public CategoryIdListView{}
}
