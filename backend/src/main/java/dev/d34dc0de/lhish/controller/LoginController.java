package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.exceptions.FailedToLoginException;
import dev.d34dc0de.lhish.form.LoginForm;
import dev.d34dc0de.lhish.model.JwtAccount;
import dev.d34dc0de.lhish.security.JwtService;
import dev.d34dc0de.lhish.security.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class LoginController {

    private final LoginService loginService;

    private final JwtService jwtService;

    @Autowired
    public LoginController(LoginService loginService, JwtService jwtService) {
        this.loginService = loginService;
        this.jwtService = jwtService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginForm loginForm, HttpServletResponse response) {
        return loginService.login(loginForm.username(), loginForm.password())
                .map(jwtService::tokenFromAccount)
                .map(token -> Map.of("token", token))
                .map(map -> ResponseEntity.ok().body(map))
                .orElse(ResponseEntity.ok().body(Map.of("error", "Invalid Credentials")));
    }
}
