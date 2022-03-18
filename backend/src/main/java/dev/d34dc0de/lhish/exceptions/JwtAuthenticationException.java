package dev.d34dc0de.lhish.exceptions;

import org.springframework.security.core.AuthenticationException;

public class JwtAuthenticationException extends AuthenticationException {
    public JwtAuthenticationException(String s) {
        super(s);
    }
}
