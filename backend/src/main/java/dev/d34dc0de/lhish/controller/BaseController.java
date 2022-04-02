package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.response.APIResponse;
import org.springframework.http.ResponseEntity;

import java.util.function.Function;

public abstract class BaseController {

    protected Function<Throwable, RuntimeException> getRethrowFunction() {
        return throwable -> {
            throw new RuntimeException(throwable);
        };
    }

    protected ResponseEntity<APIResponse> APIOk(String message) {
        return ResponseEntity.ok(APIResponse.ok(message));
    }

    protected ResponseEntity<APIResponse> APIError(String message) {
        return ResponseEntity.ok(APIResponse.error(message));
    }
}
