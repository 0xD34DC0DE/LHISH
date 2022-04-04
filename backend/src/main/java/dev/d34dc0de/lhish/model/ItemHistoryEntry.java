package dev.d34dc0de.lhish.model;

import lombok.Builder;

public record ItemHistoryEntry(String accountId, String actionDescription) {
    @Builder
    public ItemHistoryEntry{}
}
