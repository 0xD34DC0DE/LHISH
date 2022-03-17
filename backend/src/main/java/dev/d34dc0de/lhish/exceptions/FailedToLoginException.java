package dev.d34dc0de.lhish.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class FailedToLoginException extends Exception{
    public FailedToLoginException(String username) {
        super("Could not login with username: " + username);
    }
}
