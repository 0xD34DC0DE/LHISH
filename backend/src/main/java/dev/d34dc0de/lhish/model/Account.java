package dev.d34dc0de.lhish.model;

import dev.d34dc0de.lhish.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Document("accounts")
public class Account implements JwtAccount {
    @Id
    private String id;
    private String username;
    private String email;
    private Role role;
    private String password;
}
