package dev.d34dc0de.lhish.view;

import dev.d34dc0de.lhish.model.enums.Role;
import lombok.Builder;

public record UserAccountView (String id, String email, String username, Role role){
    @Builder
    public UserAccountView {};
}
