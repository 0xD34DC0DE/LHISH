package dev.d34dc0de.lhish.controller;

import java.util.function.Function;

public abstract class BaseController {

    protected Function<Throwable, RuntimeException> getRethrowFunction() {
        return throwable -> {
            throw new RuntimeException(throwable);
        };
    }

}
