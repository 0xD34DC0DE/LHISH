package dev.d34dc0de.lhish.security;

import java.io.Serializable;

public record JwtAuthenticationResponse(String token) implements Serializable {
}
