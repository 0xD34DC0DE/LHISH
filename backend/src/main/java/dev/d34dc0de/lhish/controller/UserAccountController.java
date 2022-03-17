package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.form.UserAccountCreationForm;
import dev.d34dc0de.lhish.form.model_factory.UserAccountModelFactory;
import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.service.UserAccountService;
import dev.d34dc0de.lhish.view.UserAccountView;
import dev.d34dc0de.lhish.view.view_factory.UserAccountViewFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController()
@RequestMapping("/user")
public class UserAccountController {

    private final UserAccountService userAccountService;

    private final PasswordEncoder passwordEncoder;

    public UserAccountController(UserAccountService userAccountService, PasswordEncoder passwordEncoder) {
        this.userAccountService = userAccountService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    private ResponseEntity<UserAccountView> createAccount(@RequestBody UserAccountCreationForm account) {
        if (userAccountService.findByUsername(account.username()).isEmpty()) {
            return Optional.of(account)
                    .map(acc -> UserAccountModelFactory.toModel(passwordEncoder, acc))
                    .map(userAccountService::insert)
                    .map(UserAccountViewFactory::toView)
                    .map(acc -> ResponseEntity.status(HttpStatus.CREATED).body(acc))
                    .orElse(ResponseEntity.internalServerError().build());
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @GetMapping("/exists/{username}")
    private ResponseEntity<Boolean> getuserExists(@PathVariable("username") String username) {
        return ResponseEntity.ok(userAccountService.findByUsername(username).isPresent());
    }

    @GetMapping("/profile")
    private ResponseEntity<UserAccountView> getUserAccountView(@AuthenticationPrincipal Account principal) {
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
