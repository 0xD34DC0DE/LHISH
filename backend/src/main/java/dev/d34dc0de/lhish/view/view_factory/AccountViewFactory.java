package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.view.AccountView;

public abstract class AccountViewFactory {

    public static AccountView toView(Account account) {
        return new AccountView(account.getId(), account.getUsername(), account.getRole());
    }

}
