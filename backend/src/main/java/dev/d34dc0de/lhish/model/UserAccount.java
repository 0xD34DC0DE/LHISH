package dev.d34dc0de.lhish.model;

import dev.d34dc0de.lhish.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;

@AllArgsConstructor
public class UserAccount extends Account {

    @Builder(builderMethodName = "userAccountBuilder")
    public UserAccount(String id, String username, String email, Role role, String password) {
        super(id, username, email, role, password);
    }
}

