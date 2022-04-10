package dev.d34dc0de.lhish.model;

import lombok.Builder;

import java.time.LocalDateTime;

public record ItemHistoryEntry(String accountId, String actionDescription, LocalDateTime timestamp) {
    @Builder
    public ItemHistoryEntry{}
}
