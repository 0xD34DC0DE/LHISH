package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.repository.AccountRepository;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService extends BaseService<Account, AccountRepository> {

    private final AccountRepository accountRepository;

    private final PasswordEncoder passwordEncoder;

    public AccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        super(accountRepository);
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Account save(Account account) {
        String hashedPassword = getHashedPassword(account.getPassword());
        account.setPassword(hashedPassword);
        return super.save(account);
    }

    public Account updateNoHash(Account account) {
        return super.update(account);
    }

    private String getHashedPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public Optional<Account> findByUsernameAndPassword(String username, String password) {
        return findByUsername(username)
                .map(acc -> passwordMatches(password, acc.getPassword()) ? acc : null);
    }

    private boolean passwordMatches(String password, String hashedPassword) {
        return passwordEncoder.matches(password, hashedPassword);
    }

    public Optional<Account> findByUsername(String username) {
        Criteria criteria = Criteria.where("username").is(username);
        return accountRepository.queryOne(criteria);
    }
}
