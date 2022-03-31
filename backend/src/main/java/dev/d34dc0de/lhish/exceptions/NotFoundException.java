package dev.d34dc0de.lhish.exceptions;

public class NotFoundException extends APIException {
    public NotFoundException(String message, String objectId) {
        super(message + ": " + (objectId == null ? "null" : objectId));
    }
}
