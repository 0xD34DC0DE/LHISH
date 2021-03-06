package dev.d34dc0de.lhish.configuration;

import dev.d34dc0de.lhish.security.JwtAuthFilter;
import dev.d34dc0de.lhish.security.JwtAuthenticationEntryPoint;
import dev.d34dc0de.lhish.security.JwtAuthenticationProvider;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtAuthFilter jwtAuthFilter;

    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter,
                          JwtAuthenticationProvider jwtAuthenticationProvider,
                          JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.jwtAuthenticationProvider = jwtAuthenticationProvider;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(jwtAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.cors();
        http.authorizeRequests()
                .antMatchers(
                        "/login/**",
                        "/user/register",
                        "/user/usernames",
                        "/user/exists/*",
                        "/permission/name/*",
                        "/image/*").permitAll()
                .antMatchers("/user/*").authenticated()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint);
        // ...
    }

}
