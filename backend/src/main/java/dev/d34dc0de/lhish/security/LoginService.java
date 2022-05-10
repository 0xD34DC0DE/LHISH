package dev.d34dc0de.lhish.security;

import dev.d34dc0de.lhish.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    private final AccountService accountService;

    private final JwtService jwtService;

    @Autowired
    public LoginService(AccountService accountService, JwtService jwtService) {
        this.accountService = accountService;
        this.jwtService = jwtService;
    }

    /**
     * Try to log in with the given credentials.
     * @param username The username of the account.
     * @param password The plaintext password of the account.
     * @return JWT token
     */
    public Optional<String> login(String username, String password) {
        return accountService.findByUsernameAndPassword(username, password).map(jwtService::tokenFromAccount);
    }

    public boolean userExists(String username) {
        return accountService.findByUsername(username).isPresent();
    }
}

