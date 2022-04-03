package dev.d34dc0de.lhish.form;

import lombok.Builder;

import java.time.LocalDateTime;

public record ItemHistoryActionForm(String id, String action, LocalDateTime date) {
    @Builder
    public ItemHistoryActionForm(String id, String action, LocalDateTime date) {
        this.id = id;
        this.action = action;
        this.date = LocalDateTime.now();
    }
}
