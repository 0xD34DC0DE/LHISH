package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.model.Account;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final AccountService accountService;

    public JwtUserDetailsService(AccountService accountService) {
        this.accountService = accountService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return accountService.findByUsername(username)
                .map(this::accountToUser)
                .orElseThrow(() -> new UsernameNotFoundException("Account not found with username: " + username));
    }

    private User accountToUser(Account account) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(account.getRole().toString()));
        return new User(account.getUsername(), account.getPassword(), authorities);
    }
}
