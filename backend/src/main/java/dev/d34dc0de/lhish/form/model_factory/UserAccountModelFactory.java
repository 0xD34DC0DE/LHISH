package dev.d34dc0de.lhish.form.model_factory;

import dev.d34dc0de.lhish.form.UserAccountCreationForm;
import dev.d34dc0de.lhish.model.UserAccount;
import dev.d34dc0de.lhish.model.enums.Role;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public abstract class UserAccountModelFactory {

    public static UserAccount toModel(PasswordEncoder passwordEncoder, UserAccountCreationForm accountCreationForm) {
        return UserAccount.userAccountBuilder()
                .username(accountCreationForm.username())
                .password(passwordEncoder.encode(accountCreationForm.password()))
                .email(accountCreationForm.email())
                .role(Role.USER)
                .build();
    }

}
