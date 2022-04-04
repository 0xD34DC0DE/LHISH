package dev.d34dc0de.lhish.view;

import lombok.Builder;

import java.util.List;

public record ItemHistoryView(List<String> accountNames, List<String> actions) {
    @Builder
    public ItemHistoryView{}
}
