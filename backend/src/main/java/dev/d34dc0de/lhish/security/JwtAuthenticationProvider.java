package dev.d34dc0de.lhish.security;

import dev.d34dc0de.lhish.exceptions.JwtAuthenticationException;
import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.model.JwtAccount;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {

    private final JwtService jwtService;

    public JwtAuthenticationProvider(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        return jwtService.accountFromToken((String) authentication.getCredentials(), Account.class)
                .map(JwtAuthenticatedProfile::new)
                .orElseThrow(() -> new JwtAuthenticationException("Failed to verify token"));
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return JwtAuthToken.class.equals(authentication);
    }

}
