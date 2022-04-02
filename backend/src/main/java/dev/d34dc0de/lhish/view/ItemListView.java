package dev.d34dc0de.lhish.view;

import lombok.Builder;

import java.util.List;

public record ItemListView(List<ItemView> items) {
    @Builder
    public ItemListView{}
}
