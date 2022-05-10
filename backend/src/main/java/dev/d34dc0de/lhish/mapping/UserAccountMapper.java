package dev.d34dc0de.lhish.mapping;

import dev.d34dc0de.lhish.annotation.MappingMethod;
import dev.d34dc0de.lhish.annotation.MappingOption;
import dev.d34dc0de.lhish.form.UserAccountCreationForm;
import dev.d34dc0de.lhish.form.UserAccountUpdateForm;
import dev.d34dc0de.lhish.model.UserAccount;
import dev.d34dc0de.lhish.view.UserAccountView;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserAccountMapper implements Mapper {

    private static PasswordEncoder passwordEncoder;

    public UserAccountMapper(PasswordEncoder passwordEncoder) {
        UserAccountMapper.passwordEncoder = passwordEncoder;
    }

    @MappingMethod
    public static UserAccountView toView(UserAccount account) {
        return UserAccountView.builder()
                .id(account.getId())
                .email(account.getEmail())
                .username(account.getUsername())
                .role(account.getRole())
                .build();
    }

    @MappingMethod
    @MappingOption(name = "hash")
    public static UserAccount toUserAccountWithHashedPassword(UserAccountCreationForm accountCreationForm) {
        return UserAccount.userAccountBuilder()
                .username(accountCreationForm.getUsername())
                .password(passwordEncoder.encode(accountCreationForm.getPassword()))
                .email(accountCreationForm.getEmail())
                .build();
    }

    @MappingMethod
    @MappingOption(name = "no-hash")
    public static UserAccount toUserAccount(UserAccountUpdateForm accountUpdateForm) {
        return UserAccount.userAccountBuilder()
                .id(accountUpdateForm.getId())
                .username(accountUpdateForm.getUsername())
                .email(accountUpdateForm.getEmail())
                .password(accountUpdateForm.getPassword())
                .build();
    }
}
