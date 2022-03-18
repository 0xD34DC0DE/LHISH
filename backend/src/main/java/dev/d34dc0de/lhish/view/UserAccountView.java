package dev.d34dc0de.lhish.view;

import dev.d34dc0de.lhish.model.enums.Role;

public record UserAccountView (String id, String email, String username, Role role){
}
