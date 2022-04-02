package dev.d34dc0de.lhish.view;

import lombok.Builder;

import java.util.List;

public record CategoryListView(List<CategoryView> categories) {
    @Builder
    public CategoryListView{}
}
