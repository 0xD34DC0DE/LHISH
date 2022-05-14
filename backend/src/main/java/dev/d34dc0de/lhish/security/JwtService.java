package dev.d34dc0de.lhish.security;

import dev.d34dc0de.lhish.model.JwtAccount;
import dev.d34dc0de.lhish.model.enums.Role;
import io.jsonwebtoken.*;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.logging.Level;
import java.util.logging.Logger;

import static java.time.ZoneOffset.UTC;

@Component
public class JwtService implements Clock {

    private static final Logger logger = Logger.getLogger(JwtService.class.getName());

    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.secret}")
    private String secret;

    private Claims getAllClaimsFromToken(String token) {
        try {
            return Jwts.parser().setSigningKey(secret).setClock(this).parseClaimsJws(token).getBody();
        } catch (MalformedJwtException e) {
            logger.log(Level.INFO, "Malformed JWT token");
            throw e;
        }
    }

    public String getIdFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    private Date generateExpiration() {
        return Date.from(LocalDateTime.now().plusDays(1).toInstant(UTC));
    }

    public String tokenFromAccount(JwtAccount account) {
        Date expiration = generateExpiration();
        Map<String, Object> claims = new HashMap<>();

        claims.put("username", account.getUsername());
        claims.put("role", account.getRole().toString());
        claims.put("email", account.getEmail());
        // Manually setting subject ("sub") since setSubject doesn't work with the Jwts builder
        claims.put("sub", account.getId());

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(expiration)
                .setIssuer(issuer)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public <T extends JwtAccount> Optional<T> accountFromToken(String token, Class<T> accountType) {
        try {
            Claims claims = getAllClaimsFromToken(token);
            T account = getAccountInstance(accountType);

            account.setId(claims.getSubject());
            account.setUsername(claims.get("username", String.class));
            account.setEmail(claims.get("email", String.class));

            String roleString = claims.get("role", String.class);
            account.setRole(Role.valueOf(roleString));

            return Optional.of(account);
        } catch (JwtException e) {
            logger.log(Level.WARNING, "Failed to resolve account from token", e);
            return Optional.empty();
        }
    }

    @SneakyThrows
    private <T extends JwtAccount> T getAccountInstance(Class<T> accountType) {
        return accountType.getDeclaredConstructor().newInstance();
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public Boolean validateToken(String token, JwtAccount jwtAccount) {
        final String id = getIdFromToken(token);
        return (id.equals(jwtAccount.getId()) && !isTokenExpired(token));
    }

    @Override
    public Date now() {
        return Date.from(LocalDateTime.now().toInstant(UTC));
    }
}
