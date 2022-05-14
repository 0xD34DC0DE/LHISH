package dev.d34dc0de.lhish.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAccountCreationForm {
    private String username;
    private String email;
    private String password;
}
