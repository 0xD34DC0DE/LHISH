package dev.d34dc0de.lhish.mapping;

import dev.d34dc0de.lhish.annotation.MappingMethod;
import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.view.AccountView;
import org.springframework.stereotype.Component;

@Component
public class AccountMapper implements Mapper {

    @MappingMethod
    public static AccountView toAccountView(Account account) {
        return AccountView.builder()
                .id(account.getId())
                .username(account.getUsername())
                .role(account.getRole())
                .build();
    }

}
