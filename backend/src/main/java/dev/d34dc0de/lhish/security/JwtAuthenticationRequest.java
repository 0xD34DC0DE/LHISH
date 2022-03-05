package dev.d34dc0de.lhish.security;

import java.io.Serializable;

public record JwtAuthenticationRequest(String username, String password) implements Serializable {
}
