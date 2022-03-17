package dev.d34dc0de.lhish.view.view_factory;


import dev.d34dc0de.lhish.model.UserAccount;
import dev.d34dc0de.lhish.view.UserAccountView;

public abstract class UserAccountViewFactory {

    public static UserAccountView toView(UserAccount account) {
        return new UserAccountView(account.getId(),account.getEmail(), account.getUsername(), account.getRole());
    }

}

