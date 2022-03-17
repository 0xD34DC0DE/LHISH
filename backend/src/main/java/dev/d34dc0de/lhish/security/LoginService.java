package dev.d34dc0de.lhish.security;

import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class LoginService {

    private final AccountService accountService;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginService(AccountService accountService, PasswordEncoder passwordEncoder) {
        this.accountService = accountService;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<Account> login(String username, String password) {
        return accountService.findByUsername(username).filter(acc ->
                passwordEncoder.matches(password, acc.getPassword())
        );
    }
}

