package dev.d34dc0de.lhish.model;

import dev.d34dc0de.lhish.model.enums.Role;

public class UserAccount extends Account {

    public UserAccount(String id, String username, String email, String password) {
        super(id, Role.USER, username, email, password);
    }

}
