package dev.d34dc0de.lhish.exceptions.handler;

import dev.d34dc0de.lhish.exceptions.APIException;
import dev.d34dc0de.lhish.response.APIResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class WebExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {APIException.class})
    protected ResponseEntity<APIResponse> handleConflict(RuntimeException ex, WebRequest request) {
        return APIResponse.error(ex.getMessage());
    }
}
