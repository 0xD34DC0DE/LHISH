package dev.d34dc0de.lhish.model;

import dev.d34dc0de.lhish.model.enums.Role;

public interface JwtAccount {

    String getId();
    void setId(String id);

    String getUsername();
    void setUsername(String username);

    String getEmail();
    void setEmail(String email);

    Role getRole();
    void setRole(Role role);
}
