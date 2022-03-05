package dev.d34dc0de.lhish.model;

import dev.d34dc0de.lhish.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@Builder
@Data
@Document("accounts")
public class Account {

    @Id
    private String id;
    Role role;
    private String username;
    private String email;
    private String password;
}
