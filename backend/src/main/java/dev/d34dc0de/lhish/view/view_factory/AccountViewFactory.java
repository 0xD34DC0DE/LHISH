package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.view.AccountView;

public abstract class AccountViewFactory {

    public static AccountView toView(Account account) {
        return AccountView.builder()
                .id(account.getId())
                .username(account.getUsername())
                .role(account.getRole())
                .build();
    }

}
