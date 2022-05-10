package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.form.UserAccountCreationForm;
import dev.d34dc0de.lhish.form.UserAccountUpdateForm;
import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.model.UserAccount;
import dev.d34dc0de.lhish.service.MapperService;
import dev.d34dc0de.lhish.service.UserAccountService;
import dev.d34dc0de.lhish.view.DBMetricsView;
import dev.d34dc0de.lhish.view.UserAccountView;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/user")
public class UserAccountController extends BaseController {

    private final UserAccountService userAccountService;

    private final MapperService mapperService;

    public UserAccountController(UserAccountService userAccountService,
                                 MapperService mapperService) {
        this.userAccountService = userAccountService;
        this.mapperService = mapperService;
    }

    @PostMapping("/register")
    private ResponseEntity<UserAccountView> createAccount(@RequestBody UserAccountCreationForm account) {
        if (userAccountService.findByUsername(account.getUsername()).isEmpty()) {
            return Optional.of(account)
                    .map(acc -> map(acc, UserAccount.class, "hash"))
                    .map(userAccountService::save)
                    .map(acc -> mapperService.map(acc, UserAccountView.class))
                    .map(acc -> ResponseEntity.status(HttpStatus.CREATED).body(acc))
                    .orElse(ResponseEntity.internalServerError().build());
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @GetMapping("/usernames")
    private ResponseEntity<List<String>> getAllUsernames() {
        return ok(userAccountService.getAllUsernames());
    }

    @GetMapping("/profile")
    private ResponseEntity<UserAccountView> getUserAccountView(@AuthenticationPrincipal Account principal) {
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/update")
    private ResponseEntity<UserAccountView> updateUserAccount(
            @RequestBody UserAccountUpdateForm account) {
        UserAccount userAccount = userAccountService.update(map(account, UserAccount.class, "no-hash"));
        return ok(map(userAccount, UserAccountView.class));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    private ResponseEntity<List<UserAccountView>> getAllUserAccountViews(@AuthenticationPrincipal Account principal) {
        return ok(userAccountService.getAll().stream()
                .map(userAccount -> mapperService.map(userAccount, UserAccountView.class))
                .toList());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/metrics")
    private ResponseEntity<DBMetricsView> getDBMetrics() {
        return ok(map(userAccountService.getMetrics(), DBMetricsView.class));
    }
}
