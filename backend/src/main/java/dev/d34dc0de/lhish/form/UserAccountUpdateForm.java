package dev.d34dc0de.lhish.form;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserAccountUpdateForm extends UserAccountCreationForm {
    private String id;

    @Builder
    public UserAccountUpdateForm(String username, String email, String password, String id) {
        super(username, email, password);
        this.id = id;
    }
}
