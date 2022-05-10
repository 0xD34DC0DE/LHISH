package dev.d34dc0de.lhish.model;

import dev.d34dc0de.lhish.model.enums.Role;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class AdminAccount extends Account {

    @Builder(builderMethodName = "adminAccountBuilder")
    public AdminAccount(String id, String username, String email, String password) {
        super(id, username, email, Role.ADMIN, password);
    }
}
