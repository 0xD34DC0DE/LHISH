package dev.d34dc0de.lhish.apprunner;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.model.AdminAccount;
import dev.d34dc0de.lhish.service.AccountService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AdminAccountRegistration implements ApplicationRunner {

    private static final String ADMIN_ACCOUNT_JSON_PATH = "classpath:admin_account.json";

    private final AccountService accountService;

    private final ResourceLoader resourceLoader;

    public AdminAccountRegistration(AccountService accountService,
                                    ResourceLoader resourceLoader) {
        this.accountService = accountService;
        this.resourceLoader = resourceLoader;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Resource adminAccountResource = resourceLoader.getResource(ADMIN_ACCOUNT_JSON_PATH);
        ObjectMapper objectMapper = new ObjectMapper();
        AdminAccount adminAccount = objectMapper.readValue(adminAccountResource.getInputStream(), AdminAccount.class);

        String adminUsername = adminAccount.getUsername();
        Optional<Account> accountQueryResult = accountService.findByUsername(adminUsername);

        if (accountQueryResult.isEmpty()) {
            accountService.save(adminAccount);
        }
    }
}
