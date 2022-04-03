package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.exceptions.NotFoundException;
import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account createAccount(Account account) {
        return accountRepository.insert(account);
    }

    public Optional<Account> findByUsernameAndPassword(String username, String password) {
        return accountRepository.findByUsernameAndPassword(username, password);
    }

    public Optional<Account> findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    /**
     * Try to find an account by its id.
     * @param id id of the account to find.
     * @return Optional<Account> if found, empty Optional otherwise.
     */
    public Optional<Account> findById(String id) {
        return accountRepository.findById(id);
    }

    /**
     * Get an account by its id.
     * @param id id of the account to get.
     * @return Category if found, throws NotFoundException otherwise.
     */
    public Account getById(String id) {
        return accountRepository.findById(id).orElseThrow(() -> new NotFoundException("Account", id));
    }
}
