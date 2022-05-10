package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.form.LoginForm;
import dev.d34dc0de.lhish.security.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/login")
public class LoginController extends BaseController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping()
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginForm loginForm) {
        return loginService.login(loginForm.username(), loginForm.password())
                .map(token -> JSON(KVPair.of("token", token)))
                .orElse(JSON(KVPair.of("error", "Invalid Credentials")));
    }

    @GetMapping("/exists/{username}")
    private ResponseEntity<Boolean> getUserExists(@PathVariable("username") String username) {
        return ok(loginService.userExists(username));
    }
}
