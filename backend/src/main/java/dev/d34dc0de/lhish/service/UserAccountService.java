package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.exceptions.NotFoundException;
import dev.d34dc0de.lhish.model.UserAccount;
import dev.d34dc0de.lhish.repository.UserAccountRepository;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserAccountService extends BaseService<UserAccount, UserAccountRepository> {

    private final AccountService accountService;

    public UserAccountService(UserAccountRepository userAccountRepository, AccountService accountService) {
        super(userAccountRepository);
        this.accountService = accountService;
    }

    public Optional<UserAccount> findByUsername(String username) {
        Criteria criteria = Criteria.where("username").is(username);
        return repository.queryOneRestricted(criteria);
    }

    public List<String> getAllUsernames() {
        return repository.queryMultipleRestrictedStream().map(UserAccount::getUsername).toList();
    }

    @Override
    public List<UserAccount> getAll() {
        return repository.queryMultipleRestricted();
    }

    public UserAccount update(UserAccount updatedAccount) {
        return repository.findById(updatedAccount.getId())
                .map(result -> {
                    if (updatedAccount.getPassword() != null) {
                        return (UserAccount) accountService.save(updatedAccount);
                    } else {
                        updatedAccount.setPassword(result.getPassword()); // keep old password
                        return (UserAccount) accountService.updateNoHash(updatedAccount);
                    }
                })
                .orElseThrow(() -> new NotFoundException("UserAccount", updatedAccount.getId()));
    }
}
