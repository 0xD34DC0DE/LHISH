package dev.d34dc0de.lhish.view;

import dev.d34dc0de.lhish.model.enums.Role;
import lombok.Builder;

public record AccountView (String id, String username, Role role) {
    @Builder
    public AccountView {}
}

