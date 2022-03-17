package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.model.UserAccount;
import dev.d34dc0de.lhish.repository.UserAccountRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserAccountService {

    private final UserAccountRepository userAccountRepository;

    public UserAccountService(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

    public UserAccount insert(UserAccount account) {
        return userAccountRepository.insert(account);
    }

    public Optional<UserAccount> findByUsername(String username) {
        return userAccountRepository.findByUsername(username);
    }
}
